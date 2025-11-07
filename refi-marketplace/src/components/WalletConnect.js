// src/components/WalletConnect.js
import React, { useState, useEffect } from 'react';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';

const WalletConnect = ({ onConnect, onDisconnect }) => {
    const [provider, setProvider] = useState(null);
    const [account, setAccount] = useState('');
    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(false);

    // Initialize WalletConnect
    const initWalletConnect = async () => {
        try {
            const walletConnectProvider = new WalletConnectProvider({
                rpc: {
                    42220: 'https://forno.celo.org', // Celo Mainnet
                    44787: 'https://alfajores-forno.celo-testnet.org', // Celo Alfajores Testnet
                    1: 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID', // Ethereum Mainnet
                },
                bridge: 'https://bridge.walletconnect.org',
                qrcodeModalOptions: {
                    mobileLinks: [
                        'valora',
                        'celowallet', 
                        'metamask',
                        'trust',
                        'rainbow',
                        'argent'
                    ]
                }
            });

            setProvider(walletConnectProvider);

            // Subscribe to events
            walletConnectProvider.on('accountsChanged', (accounts) => {
                console.log('Accounts changed:', accounts);
                setAccount(accounts[0] || '');
            });

            walletConnectProvider.on('chainChanged', (chainId) => {
                console.log('Chain changed:', chainId);
                // You can handle chain changes here
            });

            walletConnectProvider.on('disconnect', (code, reason) => {
                console.log('Disconnected:', code, reason);
                handleDisconnect();
            });

            // Check if already connected
            if (walletConnectProvider.connected) {
                await handleConnection(walletConnectProvider);
            }

            return walletConnectProvider;
        } catch (error) {
            console.error('Error initializing WalletConnect:', error);
            return null;
        }
    };

    const handleConnection = async (walletConnectProvider) => {
        try {
            const web3 = new Web3(walletConnectProvider);
            const accounts = await web3.eth.getAccounts();
            
            if (accounts.length > 0) {
                setAccount(accounts[0]);
                setConnected(true);
                if (onConnect) {
                    onConnect({
                        address: accounts[0],
                        provider: walletConnectProvider,
                        web3: web3,
                        type: 'walletconnect'
                    });
                }
            }
        } catch (error) {
            console.error('Error handling connection:', error);
        }
    };

    const connectWallet = async () => {
        setLoading(true);
        try {
            const walletConnectProvider = provider || await initWalletConnect();
            
            if (!walletConnectProvider) {
                throw new Error('Failed to initialize WalletConnect');
            }

            // Enable session (triggers QR Code modal)
            await walletConnectProvider.enable();
            await handleConnection(walletConnectProvider);

        } catch (error) {
            console.error('WalletConnect connection failed:', error);
            if (error.message !== 'User closed modal') {
                alert('Connection failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDisconnect = async () => {
        if (provider) {
            try {
                await provider.disconnect();
            } catch (error) {
                console.error('Error disconnecting:', error);
            }
        }
        setProvider(null);
        setAccount('');
        setConnected(false);
        if (onDisconnect) {
            onDisconnect();
        }
    };

    const getNetworkName = (chainId) => {
        const networks = {
            '1': 'Ethereum',
            '42220': 'Celo Mainnet',
            '44787': 'Celo Alfajores'
        };
        return networks[chainId] || `Chain ${chainId}`;
    };

    // Initialize on component mount
    useEffect(() => {
        initWalletConnect();
    }, []);

    return (
        <div style={styles.container}>
            {!connected ? (
                <button 
                    onClick={connectWallet}
                    disabled={loading}
                    style={loading ? styles.buttonDisabled : styles.connectButton}
                >
                    {loading ? (
                        <>
                            <span style={styles.spinner}>⏳</span>
                            Connecting...
                        </>
                    ) : (
                        <>
                            <span style={styles.icon}>🔗</span>
                            Connect Wallet
                        </>
                    )}
                </button>
            ) : (
                <div style={styles.connectedContainer}>
                    <div style={styles.connectionInfo}>
                        <div style={styles.statusIndicator}>
                            <span style={styles.connectedDot}>●</span>
                            Connected
                        </div>
                        <div style={styles.accountInfo}>
                            {account.slice(0, 8)}...{account.slice(-6)}
                        </div>
                    </div>
                    <button 
                        onClick={handleDisconnect}
                        style={styles.disconnectButton}
                    >
                        Disconnect
                    </button>
                </div>
            )}
            
            {!connected && (
                <div style={styles.walletList}>
                    <p style={styles.supportedText}>Supported Wallets:</p>
                    <div style={styles.walletIcons}>
                        <div style={styles.walletItem}>
                            <span style={styles.walletIcon}>📱</span>
                            <span style={styles.walletName}>Valora</span>
                        </div>
                        <div style={styles.walletItem}>
                            <span style={styles.walletIcon}>🟡</span>
                            <span style={styles.walletName}>Celo Wallet</span>
                        </div>
                        <div style={styles.walletItem}>
                            <span style={styles.walletIcon}>🦊</span>
                            <span style={styles.walletName}>MetaMask</span>
                        </div>
                        <div style={styles.walletItem}>
                            <span style={styles.walletIcon}>🔒</span>
                            <span style={styles.walletName}>Trust</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        color: 'white',
        margin: '20px 0'
    },
    connectButton: {
        background: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        padding: '15px 30px',
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        margin: '0 auto',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        minWidth: '200px'
    },
    buttonDisabled: {
        background: 'rgba(255, 255, 255, 0.1)',
        color: 'rgba(255, 255, 255, 0.7)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        padding: '15px 30px',
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        margin: '0 auto',
        minWidth: '200px',
        cursor: 'not-allowed'
    },
    icon: {
        fontSize: '18px'
    },
    spinner: {
        fontSize: '18px',
        animation: 'spin 1s linear infinite'
    },
    connectedContainer: {
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '20px',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)'
    },
    connectionInfo: {
        marginBottom: '15px'
    },
    statusIndicator: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontSize: '14px',
        marginBottom: '8px'
    },
    connectedDot: {
        color: '#4CAF50',
        fontSize: '12px'
    },
    accountInfo: {
        fontSize: '16px',
        fontWeight: '600',
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '10px',
        borderRadius: '8px',
        fontFamily: 'monospace'
    },
    disconnectButton: {
        background: 'rgba(255, 107, 107, 0.8)',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        transition: 'all 0.3s ease'
    },
    walletList: {
        marginTop: '20px'
    },
    supportedText: {
        fontSize: '14px',
        marginBottom: '10px',
        opacity: '0.9'
    },
    walletIcons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap'
    },
    walletItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '5px'
    },
    walletIcon: {
        fontSize: '24px'
    },
    walletName: {
        fontSize: '12px',
        opacity: '0.8'
    }
};

export default WalletConnect;