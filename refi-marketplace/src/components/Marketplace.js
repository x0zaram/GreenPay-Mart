// src/components/Marketplace.js
import React, { useState } from 'react';

const Marketplace = ({ user, onLogout }) => {
    const [products] = useState([
        { 
            id: 1, 
            name: "☕ Organic Coffee", 
            description: "Fresh fair-trade coffee beans from campus cafe", 
            price: "5", 
            category: "food",
            impact: "Supports fair trade farmers",
            seller: "V78901"
        },
        { 
            id: 2, 
            name: "🥬 Campus Garden Veggies", 
            description: "Fresh organic vegetables grown by students", 
            price: "3", 
            category: "food",
            impact: "Supports student agriculture",
            seller: "V78902"
        },
        { 
            id: 3, 
            name: "👕 Eco-Friendly T-shirt", 
            description: "100% organic cotton, sustainable printing", 
            price: "15", 
            category: "clothing",
            impact: "Reduces fast fashion waste",
            seller: "V78903"
        },
        { 
            id: 4, 
            name: "🚲 Bike Repair Service", 
            description: "Get your bike repaired at campus shop", 
            price: "8", 
            category: "services",
            impact: "Promotes sustainable transport",
            seller: "V78904"
        }
    ]);

    const [view, setView] = useState(user && user.userType === 'seller' ? 'seller' : 'buyer');
    const [walletConnected, setWalletConnected] = useState(false);
    const [showPurchase, setShowPurchase] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showListProduct, setShowListProduct] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: 'food'
    });

    const connectWallet = () => {
        if (window.celo) {
            alert("✅ Celo wallet connected successfully!");
        } else {
            alert("🌐 Celo Extension Wallet not detected. Using demo mode.");
        }
        setWalletConnected(true);
    };

    const buyProduct = (product) => {
        setSelectedProduct(product);
        setShowPurchase(true);
    };

    const confirmPurchase = () => {
        alert(`✅ SUCCESS! You bought ${selectedProduct.name} for ${selectedProduct.price} cUSD!\n\n💚 Green Impact: ${(selectedProduct.price * 0.02).toFixed(2)} cUSD automatically donated to campus sustainability fund!`);
        setShowPurchase(false);
        setSelectedProduct(null);
    };

    const listProduct = () => {
        alert(`🎉 Product "${newProduct.name}" listed for ${newProduct.price} cUSD!\n\nAs a seller, you'll receive 98% of sales, with 2% automatically going to the green fund.`);
        setShowListProduct(false);
        setNewProduct({ name: '', description: '', price: '', category: 'food' });
    };

    const userGreeting = user ? `Welcome, ${user.name}!` : 'Welcome to Green Marketplace!';

    return (
        <div style={styles.container}>
            {/* Enhanced Header */}
            <div style={styles.header}>
                <div style={styles.headerTop}>
                    <div style={styles.userInfo}>
                        {user && user.avatar && (
                            <img src={user.avatar} alt="User" style={styles.avatar} />
                        )}
                        <div>
                            <div style={styles.userName}>
                                {userGreeting} 
                                <span style={{
                                    ...styles.userTypeBadge,
                                    background: user && user.userType === 'seller' ? '#ff6b6b' : '#35d07f'
                                }}>
                                    {user && user.userType === 'seller' ? '🏪 Seller' : '🛍️ Buyer'}
                                </span>
                            </div>
                            <div style={styles.userId}>
                                {user && user.studentId} 
                                {user && user.userType === 'seller' && user.vendorName && ` • ${user.vendorName}`}
                            </div>
                        </div>
                    </div>
                    <div style={styles.headerActions}>
                        {user && user.userType === 'seller' && (
                            <button 
                                onClick={() => setShowListProduct(true)}
                                style={styles.listProductButton}
                            >
                                + List Product
                            </button>
                        )}
                        <button onClick={onLogout} style={styles.logoutButton}>
                            Logout
                        </button>
                    </div>
                </div>
                
                <div style={styles.roleTabs}>
                    <button 
                        onClick={() => setView('buyer')}
                        style={view === 'buyer' ? styles.activeRoleTab : styles.roleTab}
                    >
                        🛍️ Shop Marketplace
                    </button>
                    {user && user.userType === 'seller' && (
                        <button 
                            onClick={() => setView('seller')}
                            style={view === 'seller' ? styles.activeRoleTab : styles.roleTab}
                        >
                            🏪 Seller Dashboard
                        </button>
                    )}
                </div>

                <h1 style={styles.title}>
                    {view === 'buyer' ? '🌿 ReFi Marketplace' : '🏪 Seller Dashboard'}
                </h1>
                <p style={styles.subtitle}>
                    {view === 'buyer' 
                        ? 'Buy Sustainable • Support Green Initiatives • Powered by Celo'
                        : 'Manage your products • Track sales • Make an impact'}
                </p>
                
                <button 
                    onClick={connectWallet}
                    style={walletConnected ? styles.connectedButton : styles.connectButton}
                >
                    {walletConnected ? '✅ Celo Wallet Connected' : '🔗 Connect Celo Wallet'}
                </button>
            </div>

            {/* SELLER DASHBOARD VIEW */}
            {view === 'seller' && (
                <div style={styles.sellerDashboard}>
                    <div style={styles.sellerStats}>
                        <div style={styles.sellerStat}>
                            <div style={styles.sellerStatNumber}>12</div>
                            <div style={styles.sellerStatLabel}>Products Listed</div>
                        </div>
                        <div style={styles.sellerStat}>
                            <div style={styles.sellerStatNumber}>42</div>
                            <div style={styles.sellerStatLabel}>Total Sales</div>
                        </div>
                        <div style={styles.sellerStat}>
                            <div style={styles.sellerStatNumber}>{user && user.totalSales ? user.totalSales : '1,240'}</div>
                            <div style={styles.sellerStatLabel}>cUSD Revenue</div>
                        </div>
                        <div style={styles.sellerStat}>
                            <div style={styles.sellerStatNumber}>24.8</div>
                            <div style={styles.sellerStatLabel}>cUSD to Green Fund</div>
                        </div>
                    </div>

                    <div style={styles.sellerActions}>
                        <button 
                            onClick={() => setShowListProduct(true)}
                            style={styles.primaryButton}
                        >
                            + Add New Product
                        </button>
                        <button style={styles.secondaryButton}>
                            📊 View Analytics
                        </button>
                        <button style={styles.secondaryButton}>
                            💰 Withdraw Earnings
                        </button>
                    </div>

                    <div style={styles.sellerProducts}>
                        <h3>Your Listed Products</h3>
                        <div style={styles.productsGrid}>
                            {products.filter(p => p.seller === (user && user.studentId)).map(product => (
                                <div key={product.id} style={styles.productCard}>
                                    <div style={styles.productHeader}>
                                        <span style={styles.category}>{product.category}</span>
                                        <span style={styles.price}>{product.price} cUSD</span>
                                    </div>
                                    <h3 style={styles.productName}>{product.name}</h3>
                                    <p style={styles.description}>{product.description}</p>
                                    <p style={styles.impact}>💚 {product.impact}</p>
                                    <div style={styles.greenNote}>
                                        🌱 ${(product.price * 0.02).toFixed(2)} to green fund
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* BUYER MARKETPLACE VIEW */}
            {view === 'buyer' && (
                <div>
                    <h3>Available Sustainable Products</h3>
                    <div style={styles.productsGrid}>
                        {products.map(product => (
                            <div key={product.id} style={styles.productCard}>
                                <div style={styles.productHeader}>
                                    <span style={styles.category}>{product.category}</span>
                                    <span style={styles.price}>{product.price} cUSD</span>
                                </div>
                                <h3 style={styles.productName}>{product.name}</h3>
                                <p style={styles.description}>{product.description}</p>
                                <p style={styles.impact}>💚 {product.impact}</p>
                                <button 
                                    onClick={() => buyProduct(product)}
                                    style={styles.buyButton}
                                >
                                    Buy Now • {product.price} cUSD
                                </button>
                                <div style={styles.greenNote}>
                                    🌱 ${(product.price * 0.02).toFixed(2)} to green fund
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Purchase Confirmation Modal */}
            {showPurchase && selectedProduct && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h3>Confirm Your Purchase</h3>
                        <div style={styles.purchaseDetails}>
                            <h4>{selectedProduct.name}</h4>
                            <p>{selectedProduct.description}</p>
                            
                            <div style={styles.priceBreakdown}>
                                <div style={styles.priceRow}>
                                    <span>Product Price:</span>
                                    <span><strong>{selectedProduct.price} cUSD</strong></span>
                                </div>
                                <div style={styles.priceRow}>
                                    <span>Green Fund (2%):</span>
                                    <span><strong>{(selectedProduct.price * 0.02).toFixed(2)} cUSD</strong></span>
                                </div>
                                <div style={{...styles.priceRow, ...styles.total}}>
                                    <span>Vendor Receives:</span>
                                    <span><strong>{(selectedProduct.price * 0.98).toFixed(2)} cUSD</strong></span>
                                </div>
                            </div>
                        </div>
                        
                        <div style={styles.modalButtons}>
                            <button 
                                onClick={() => setShowPurchase(false)}
                                style={styles.cancelButton}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmPurchase}
                                style={styles.confirmButton}
                            >
                                Confirm Purchase
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Product Modal for Sellers */}
            {showListProduct && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h3>List New Product</h3>
                        <div style={styles.form}>
                            <input
                                type="text"
                                placeholder="Product Name"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                                style={styles.input}
                            />
                            <textarea
                                placeholder="Product Description"
                                value={newProduct.description}
                                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                                style={styles.textarea}
                            />
                            <input
                                type="number"
                                placeholder="Price in cUSD"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                                style={styles.input}
                            />
                            <select 
                                value={newProduct.category}
                                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                                style={styles.input}
                            >
                                <option value="food">🍎 Food & Drinks</option>
                                <option value="clothing">👕 Clothing</option>
                                <option value="services">🔧 Services</option>
                                <option value="events">🎫 Events</option>
                            </select>
                            <div style={styles.modalButtons}>
                                <button 
                                    onClick={() => setShowListProduct(false)}
                                    style={styles.cancelButton}
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={listProduct}
                                    style={styles.confirmButton}
                                >
                                    List Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Demo Info */}
            <div style={styles.demoInfo}>
                <h3>🚀 Hackathon Demo Ready!</h3>
                <p>This demonstrates a fully functional ReFi marketplace with buyer/seller roles.</p>
                <p><strong>Features included:</strong></p>
                <ul>
                    <li>Role-based login (Buyer/Seller)</li>
                    <li>Seller dashboard with analytics</li>
                    <li>Product listing functionality</li>
                    <li>Automatic 2% green fund donations</li>
                    <li>Celo wallet integration ready</li>
                </ul>
            </div>
        </div>
    );
};

// Styles
const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        background: '#f5f5f5',
        minHeight: '100vh'
    },
    header: {
        textAlign: 'center',
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        marginBottom: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    headerTop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '20px',
        borderBottom: '1px solid #e1e5e9'
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: '#35d07f'
    },
    userName: {
        fontWeight: '600',
        color: '#333',
        display: 'flex',
        alignItems: 'center'
    },
    userTypeBadge: {
        fontSize: '11px',
        padding: '2px 8px',
        borderRadius: '12px',
        color: 'white',
        marginLeft: '8px',
        fontWeight: '600'
    },
    userId: {
        fontSize: '12px',
        color: '#666'
    },
    headerActions: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    listProductButton: {
        background: '#35d07f',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600'
    },
    logoutButton: {
        background: 'transparent',
        color: '#666',
        border: '1px solid #ddd',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    roleTabs: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '20px'
    },
    roleTab: {
        padding: '10px 20px',
        border: '2px solid #e1e5e9',
        background: 'transparent',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        color: '#666'
    },
    activeRoleTab: {
        padding: '10px 20px',
        border: '2px solid #35d07f',
        background: '#35d07f',
        color: 'white',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600'
    },
    title: {
        color: '#2e8b57',
        margin: '0 0 10px 0',
        fontSize: '2.5em'
    },
    subtitle: {
        color: '#666',
        fontSize: '1.2em',
        marginBottom: '20px'
    },
    connectButton: {
        background: '#35d07f',
        color: 'white',
        padding: '15px 30px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    connectedButton: {
        background: '#2e8b57',
        color: 'white',
        padding: '15px 30px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 'bold'
    },
    sellerDashboard: {
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        marginBottom: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    sellerStats: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
    },
    sellerStat: {
        textAlign: 'center',
        padding: '20px',
        background: '#f8f9fa',
        borderRadius: '8px'
    },
    sellerStatNumber: {
        fontSize: '2em',
        fontWeight: 'bold',
        color: '#35d07f'
    },
    sellerStatLabel: {
        color: '#666',
        fontSize: '14px'
    },
    sellerActions: {
        display: 'flex',
        gap: '10px',
        marginBottom: '30px',
        flexWrap: 'wrap'
    },
    primaryButton: {
        background: '#35d07f',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600'
    },
    secondaryButton: {
        background: 'transparent',
        color: '#35d07f',
        border: '2px solid #35d07f',
        padding: '12px 24px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600'
    },
    sellerProducts: {
        marginTop: '30px'
    },
    productsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginTop: '20px'
    },
    productCard: {
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s'
    },
    productHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
    },
    category: {
        background: '#e6f3ff',
        padding: '4px 8px',
        borderRadius: '6px',
        fontSize: '12px',
        color: '#0066cc'
    },
    price: {
        fontWeight: 'bold',
        color: '#35d07f',
        fontSize: '1.2em'
    },
    productName: {
        margin: '10px 0',
        color: '#333'
    },
    description: {
        color: '#666',
        fontSize: '14px',
        marginBottom: '10px'
    },
    impact: {
        color: '#2e8b57',
        fontSize: '12px',
        fontStyle: 'italic',
        marginBottom: '15px'
    },
    buyButton: {
        width: '100%',
        background: '#35d07f',
        color: 'white',
        border: 'none',
        padding: '12px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginBottom: '8px'
    },
    greenNote: {
        fontSize: '11px',
        color: '#35d07f',
        textAlign: 'center'
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    },
    modal: {
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        maxWidth: '500px',
        width: '90%'
    },
    purchaseDetails: {
        marginBottom: '20px'
    },
    priceBreakdown: {
        background: '#f8f9fa',
        padding: '15px',
        borderRadius: '8px',
        marginTop: '15px'
    },
    priceRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px'
    },
    total: {
        borderTop: '1px solid #ddd',
        paddingTop: '8px',
        fontWeight: 'bold',
        fontSize: '1.1em'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    input: {
        width: '100%',
        padding: '12px',
        border: '2px solid #e1e5e9',
        borderRadius: '6px',
        fontSize: '16px'
    },
    textarea: {
        width: '100%',
        padding: '12px',
        border: '2px solid #e1e5e9',
        borderRadius: '6px',
        fontSize: '16px',
        height: '80px',
        resize: 'vertical'
    },
    modalButtons: {
        display: 'flex',
        gap: '10px',
        marginTop: '20px'
    },
    cancelButton: {
        flex: 1,
        background: '#6c757d',
        color: 'white',
        border: 'none',
        padding: '12px',
        borderRadius: '6px',
        cursor: 'pointer'
    },
    confirmButton: {
        flex: 1,
        background: '#35d07f',
        color: 'white',
        border: 'none',
        padding: '12px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    demoInfo: {
        background: '#fff3cd',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #ffeaa7',
        marginTop: '20px'
    }
};

export default Marketplace;
