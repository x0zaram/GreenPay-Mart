// src/components/Login.js
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [userType, setUserType] = useState('buyer'); // 'buyer' or 'seller'
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        studentId: '',
        vendorName: '',
        vendorCategory: 'food'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Simulate login/signup
        const userData = {
            id: 1,
            name: isLogin ? (userType === 'buyer' ? 'Student Buyer' : 'Campus Vendor') : formData.name,
            email: formData.email,
            studentId: isLogin ? (userType === 'buyer' ? 'S12345' : 'V78901') : formData.studentId,
            userType: userType,
            joinDate: new Date().toLocaleDateString(),
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(isLogin ? (userType === 'buyer' ? 'Student Buyer' : 'Campus Vendor') : formData.name)}&background=${userType === 'buyer' ? '35d07f' : 'ff6b6b'}&color=fff`,
            ...(userType === 'seller' && {
                vendorName: formData.vendorName || 'Campus Eco-Vendor',
                vendorCategory: formData.vendorCategory,
                totalSales: '1,240',
                rating: '4.8'
            })
        };
        
        onLogin(userData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.logo}>
                    <span style={styles.logoIcon}> </span>
                    <span style={styles.logoText}>GreenPay</span>
                </div>
                <h1 style={styles.title}>
                    {userType === 'buyer' ? '🛍️ Shop Sustainable' : '🏪 Sell with Purpose'}
                </h1>
                <p style={styles.subtitle}>
                    {userType === 'buyer' 
                        ? 'Buy eco-friendly products. Support campus green initiatives.' 
                        : 'Reach eco-conscious students. Automatically fund sustainability.'}
                </p>
            </div>

            <div style={styles.card}>
                {/* User Type Selection */}
                <div style={styles.userTypeSelector}>
                    <button 
                        style={userType === 'buyer' ? styles.activeUserType : styles.userTypeButton}
                        onClick={() => setUserType('buyer')}
                    >
                        👤 I'm a Buyer
                    </button>
                    <button 
                        style={userType === 'seller' ? styles.activeUserType : styles.userTypeButton}
                        onClick={() => setUserType('seller')}
                    >
                        🏪 I'm a Seller
                    </button>
                </div>

                <div style={styles.tabs}>
                    <button 
                        style={isLogin ? styles.activeTab : styles.tab}
                        onClick={() => setIsLogin(true)}
                    >
                        Sign In
                    </button>
                    <button 
                        style={!isLogin ? styles.activeTab : styles.tab}
                        onClick={() => setIsLogin(false)}
                    >
                        Create Account
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {!isLogin && (
                        <>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>
                                    {userType === 'buyer' ? 'Full Name' : 'Vendor Representative Name'}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={userType === 'buyer' ? "Enter your full name" : "Enter representative name"}
                                    style={styles.input}
                                    required={!isLogin}
                                />
                            </div>
                            <div style={styles.inputGroup}>
                                <label style={styles.label}>
                                    {userType === 'buyer' ? 'Student ID' : 'Vendor ID'}
                                </label>
                                <input
                                    type="text"
                                    name="studentId"
                                    value={formData.studentId}
                                    onChange={handleChange}
                                    placeholder={userType === 'buyer' ? "Enter your student ID" : "Enter vendor ID"}
                                    style={styles.input}
                                    required={!isLogin}
                                />
                            </div>
                            {userType === 'seller' && !isLogin && (
                                <>
                                    <div style={styles.inputGroup}>
                                        <label style={styles.label}>Vendor Business Name</label>
                                        <input
                                            type="text"
                                            name="vendorName"
                                            value={formData.vendorName}
                                            onChange={handleChange}
                                            placeholder="Enter your business name"
                                            style={styles.input}
                                        />
                                    </div>
                                    <div style={styles.inputGroup}>
                                        <label style={styles.label}>Business Category</label>
                                        <select
                                            name="vendorCategory"
                                            value={formData.vendorCategory}
                                            onChange={handleChange}
                                            style={styles.input}
                                        >
                                            <option value="food">🍎 Food & Drinks</option>
                                            <option value="clothing">👕 Clothing & Fashion</option>
                                            <option value="services">🔧 Services</option>
                                            <option value="events">🎫 Events & Tickets</option>
                                            <option value="supplies">📚 Supplies & Books</option>
                                        </select>
                                    </div>
                                </>
                            )}
                        </>
                    )}

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            style={styles.input}
                            required
                        />
                    </div>

                    {isLogin && (
                        <div style={styles.forgotPassword}>
                            <a href="#" style={styles.forgotLink}>Forgot password?</a>
                        </div>
                    )}

                    <button type="submit" style={{
                        ...styles.submitButton,
                        background: userType === 'buyer' 
                            ? 'linear-gradient(135deg, #35d07f 0%, #2e8b57 100%)'
                            : 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)'
                    }}>
                        {isLogin 
                            ? `Sign In as ${userType === 'buyer' ? 'Buyer' : 'Seller'}`
                            : `Create ${userType === 'buyer' ? 'Buyer' : 'Seller'} Account`
                        }
                    </button>

                    <div style={styles.divider}>
                        <span style={styles.dividerText}>or continue with</span>
                    </div>

                    <button 
                        type="button" 
                        style={styles.celoButton}
                        onClick={() => {
                            const userData = {
                                id: 2,
                                name: userType === 'buyer' ? 'Celo Buyer' : 'Celo Vendor',
                                email: userType === 'buyer' ? 'buyer@celo.com' : 'vendor@celo.com',
                                studentId: userType === 'buyer' ? 'CELO001' : 'VCELO001',
                                userType: userType,
                                joinDate: new Date().toLocaleDateString(),
                                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userType === 'buyer' ? 'Celo Buyer' : 'Celo Vendor')}&background=fcff52&color=000`,
                                walletConnected: true,
                                ...(userType === 'seller' && {
                                    vendorName: 'Celo Eco-Vendor',
                                    vendorCategory: 'food',
                                    totalSales: '2,150',
                                    rating: '4.9'
                                })
                            };
                            onLogin(userData);
                        }}
                    >
                        <span style={styles.celoIcon}>🟡</span>
                        Connect Celo Wallet
                    </button>
                </form>

                <div style={styles.features}>
                    <h4 style={styles.featuresTitle}>
                        {userType === 'buyer' ? 'Benefits for Buyers' : 'Benefits for Sellers'}
                    </h4>
                    <div style={styles.featuresGrid}>
                        {userType === 'buyer' ? (
                            <>
                                <div style={styles.feature}>
                                    <span style={styles.featureIcon}>💚</span>
                                    <div>
                                        <strong>2% Auto-Donation</strong>
                                        <p>Every purchase supports sustainability</p>
                                    </div>
                                </div>
                                <div style={styles.feature}>
                                    <span style={styles.featureIcon}>🌱</span>
                                    <div>
                                        <strong>Eco-Friendly Products</strong>
                                        <p>Shop from verified sustainable vendors</p>
                                    </div>
                                </div>
                                <div style={styles.feature}>
                                    <span style={styles.featureIcon}>🎁</span>
                                    <div>
                                        <strong>Green Rewards</strong>
                                        <p>Earn points for sustainable purchases</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div style={styles.feature}>
                                    <span style={styles.featureIcon}>📈</span>
                                    <div>
                                        <strong>Reach Eco-Conscious Students</strong>
                                        <p>Tap into the growing green market</p>
                                    </div>
                                </div>
                                <div style={styles.feature}>
                                    <span style={styles.featureIcon}>💚</span>
                                    <div>
                                        <strong>Automatic Impact</strong>
                                        <p>2% of sales go to sustainability funds</p>
                                    </div>
                                </div>
                                <div style={styles.feature}>
                                    <span style={styles.featureIcon}>🔒</span>
                                    <div>
                                        <strong>Instant cUSD Payments</strong>
                                        <p>Fast, secure payments on Celo network</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div style={styles.footer}>
                <p>By continuing, you agree to our <a href="#" style={styles.footerLink}>Terms of Service</a> and <a href="#" style={styles.footerLink}>Privacy Policy</a></p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
    },
    header: {
        textAlign: 'center',
        marginBottom: '30px',
        color: 'white'
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: 'bold'
    },
    logoIcon: {
        fontSize: '32px',
        marginRight: '10px'
    },
    logoText: {
        color: 'white'
    },
    title: {
        fontSize: '2.2em',
        margin: '0 0 10px 0',
        fontWeight: '300'
    },
    subtitle: {
        fontSize: '1.1em',
        opacity: '0.9',
        margin: '0',
        maxWidth: '500px',
        lineHeight: '1.4'
    },
    card: {
        background: 'white',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '480px'
    },
    userTypeSelector: {
        display: 'flex',
        marginBottom: '20px',
        background: '#f8f9fa',
        borderRadius: '12px',
        padding: '4px',
        gap: '4px'
    },
    userTypeButton: {
        flex: 1,
        padding: '12px 8px',
        border: 'none',
        background: 'transparent',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '500',
        color: '#666'
    },
    activeUserType: {
        flex: 1,
        padding: '12px 8px',
        border: 'none',
        background: 'white',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '600',
        color: '#35d07f',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    tabs: {
        display: 'flex',
        marginBottom: '30px',
        background: '#f8f9fa',
        borderRadius: '12px',
        padding: '4px'
    },
    tab: {
        flex: 1,
        padding: '12px',
        border: 'none',
        background: 'transparent',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        color: '#666'
    },
    activeTab: {
        flex: 1,
        padding: '12px',
        border: 'none',
        background: 'white',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        color: '#35d07f',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    inputGroup: {
        marginBottom: '20px',
        textAlign: 'left'
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontWeight: '600',
        color: '#333',
        fontSize: '14px'
    },
    input: {
        width: '100%',
        padding: '15px',
        border: '2px solid #e1e5e9',
        borderRadius: '8px',
        fontSize: '16px',
        transition: 'border-color 0.2s',
        fontFamily: 'inherit'
    },
    forgotPassword: {
        textAlign: 'right',
        marginBottom: '20px'
    },
    forgotLink: {
        color: '#35d07f',
        textDecoration: 'none',
        fontSize: '14px'
    },
    submitButton: {
        color: 'white',
        border: 'none',
        padding: '16px',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        marginBottom: '20px',
        transition: 'transform 0.2s'
    },
    divider: {
        position: 'relative',
        textAlign: 'center',
        margin: '20px 0',
        borderTop: '1px solid #e1e5e9'
    },
    dividerText: {
        background: 'white',
        padding: '0 15px',
        color: '#666',
        fontSize: '14px',
        position: 'absolute',
        top: '-10px',
        left: '50%',
        transform: 'translateX(-50%)'
    },
    celoButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fcff52',
        color: 'black',
        border: 'none',
        padding: '15px',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        gap: '10px'
    },
    celoIcon: {
        fontSize: '18px'
    },
    features: {
        marginTop: '30px',
        paddingTop: '30px',
        borderTop: '1px solid #e1e5e9'
    },
    featuresTitle: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333'
    },
    featuresGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    feature: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '15px',
        padding: '15px',
        background: '#f8f9fa',
        borderRadius: '8px'
    },
    featureIcon: {
        fontSize: '20px',
        flexShrink: 0
    },
    footer: {
        marginTop: '30px',
        textAlign: 'center',
        color: 'white',
        fontSize: '14px'
    },
    footerLink: {
        color: 'white',
        textDecoration: 'underline'
    }
};

export default Login;