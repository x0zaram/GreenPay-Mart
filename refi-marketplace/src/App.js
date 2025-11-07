// src/App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView('marketplace');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  // Professional Login Component
  const Login = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [userType, setUserType] = useState('buyer');
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
      
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        name: isLogin ? (userType === 'buyer' ? 'Student Buyer' : 'Campus Vendor') : formData.name,
        email: formData.email || 'demo@campus.edu',
        studentId: isLogin ? (userType === 'buyer' ? 'S' + Math.floor(10000 + Math.random() * 90000) : 'V' + Math.floor(10000 + Math.random() * 90000)) : formData.studentId,
        userType: userType,
        joinDate: new Date().toLocaleDateString(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(isLogin ? (userType === 'buyer' ? 'Student Buyer' : 'Campus Vendor') : formData.name)}&background=${userType === 'buyer' ? '35d07f' : 'ff6b6b'}&color=fff`,
        ...(userType === 'seller' && {
          vendorName: formData.vendorName || 'Campus Eco-Vendor',
          vendorCategory: formData.vendorCategory,
          totalSales: (Math.random() * 2000 + 500).toFixed(0),
          rating: (4 + Math.random()).toFixed(1)
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

    const handleCeloLogin = () => {
      const userData = {
        id: 'celo_' + Math.random().toString(36).substr(2, 9),
        name: userType === 'buyer' ? 'Celo Student' : 'Celo Vendor',
        email: userType === 'buyer' ? 'celo.student@campus.edu' : 'celo.vendor@campus.edu',
        studentId: userType === 'buyer' ? 'CELO001' : 'VCELO001',
        userType: userType,
        joinDate: new Date().toLocaleDateString(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userType === 'buyer' ? 'Celo Student' : 'Celo Vendor')}&background=fcff52&color=000`,
        walletConnected: true,
        ...(userType === 'seller' && {
          vendorName: 'Celo Eco-Store',
          vendorCategory: 'food',
          totalSales: '2,150',
          rating: '4.9'
        })
      };
      onLogin(userData);
    };

    return (
      <div style={loginStyles.container}>
        <div style={loginStyles.header}>
          <div style={loginStyles.logo}>
            <span style={loginStyles.logoIcon}>🌿</span>
            <span style={loginStyles.logoText}>GreenPay</span>
          </div>
          <h1 style={loginStyles.title}>
            {userType === 'buyer' ? '🛍️ Shop Sustainable' : '🏪 Sell with Purpose'}
          </h1>
          <p style={loginStyles.subtitle}>
            {userType === 'buyer' 
              ? 'Buy eco-friendly products. 2% automatically supports campus green initiatives.' 
              : 'Reach eco-conscious students. Every sale funds sustainability automatically.'}
          </p>
        </div>

        <div style={loginStyles.card}>
          {/* User Type Selection */}
          <div style={loginStyles.userTypeSelector}>
            <button 
              style={userType === 'buyer' ? loginStyles.activeUserType : loginStyles.userTypeButton}
              onClick={() => setUserType('buyer')}
            >
              👤 I'm a Buyer
            </button>
            <button 
              style={userType === 'seller' ? loginStyles.activeUserType : loginStyles.userTypeButton}
              onClick={() => setUserType('seller')}
            >
              🏪 I'm a Seller
            </button>
          </div>

          <div style={loginStyles.tabs}>
            <button 
              style={isLogin ? loginStyles.activeTab : loginStyles.tab}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button 
              style={!isLogin ? loginStyles.activeTab : loginStyles.tab}
              onClick={() => setIsLogin(false)}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} style={loginStyles.form}>
            {!isLogin && (
              <>
                <div style={loginStyles.inputGroup}>
                  <label style={loginStyles.label}>
                    {userType === 'buyer' ? 'Full Name' : 'Vendor Representative Name'}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={userType === 'buyer' ? "Enter your full name" : "Enter representative name"}
                    style={loginStyles.input}
                    required={!isLogin}
                  />
                </div>
                <div style={loginStyles.inputGroup}>
                  <label style={loginStyles.label}>
                    {userType === 'buyer' ? 'Student ID' : 'Vendor ID'}
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder={userType === 'buyer' ? "Enter your student ID" : "Enter vendor ID"}
                    style={loginStyles.input}
                    required={!isLogin}
                  />
                </div>
                {userType === 'seller' && !isLogin && (
                  <>
                    <div style={loginStyles.inputGroup}>
                      <label style={loginStyles.label}>Vendor Business Name</label>
                      <input
                        type="text"
                        name="vendorName"
                        value={formData.vendorName}
                        onChange={handleChange}
                        placeholder="Enter your business name"
                        style={loginStyles.input}
                      />
                    </div>
                    <div style={loginStyles.inputGroup}>
                      <label style={loginStyles.label}>Business Category</label>
                      <select
                        name="vendorCategory"
                        value={formData.vendorCategory}
                        onChange={handleChange}
                        style={loginStyles.input}
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

            <div style={loginStyles.inputGroup}>
              <label style={loginStyles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your campus email"
                style={loginStyles.input}
                required
              />
            </div>

            <div style={loginStyles.inputGroup}>
              <label style={loginStyles.label}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                style={loginStyles.input}
                required
              />
            </div>

            {isLogin && (
              <div style={loginStyles.forgotPassword}>
                <a href="#" style={loginStyles.forgotLink}>Forgot password?</a>
              </div>
            )}

            <button type="submit" style={{
              ...loginStyles.submitButton,
              background: userType === 'buyer' 
                ? 'linear-gradient(135deg, #35d07f 0%, #2e8b57 100%)'
                : 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)'
            }}>
              {isLogin 
                ? `Sign In as ${userType === 'buyer' ? 'Buyer' : 'Seller'}`
                : `Create ${userType === 'buyer' ? 'Buyer' : 'Seller'} Account`
              }
            </button>

            <div style={loginStyles.divider}>
              <span style={loginStyles.dividerText}>or continue with</span>
            </div>

            <button 
              type="button" 
              style={loginStyles.celoButton}
              onClick={handleCeloLogin}
            >
              <span style={loginStyles.celoIcon}>🟡</span>
              Connect Celo Wallet
            </button>
          </form>

          <div style={loginStyles.features}>
            <h4 style={loginStyles.featuresTitle}>
              {userType === 'buyer' ? 'Why Students Love GreenPay:' : 'Why Vendors Choose GreenPay:'}
            </h4>
            <div style={loginStyles.featuresGrid}>
              {userType === 'buyer' ? (
                <>
                  <div style={loginStyles.feature}>
                    <span style={loginStyles.featureIcon}>💚</span>
                    <div>
                      <strong>0.2% Auto-Donation</strong>
                      <p>Every purchase supports campus sustainability</p>
                    </div>
                  </div>
                  <div style={loginStyles.feature}>
                    <span style={loginStyles.featureIcon}>🌱</span>
                    <div>
                      <strong>Eco-Friendly Products</strong>
                      <p>Verified sustainable vendors only</p>
                    </div>
                  </div>
                  <div style={loginStyles.feature}>
                    <span style={loginStyles.featureIcon}>⚡</span>
                    <div>
                      <strong>Instant cUSD Payments</strong>
                      <p>Fast, low-fee transactions on Celo</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div style={loginStyles.feature}>
                    <span style={loginStyles.featureIcon}>📈</span>
                    <div>
                      <strong>Reach Eco-Conscious Students</strong>
                      <p>Tap into the $50B+ student market</p>
                    </div>
                  </div>
                  <div style={loginStyles.feature}>
                    <span style={loginStyles.featureIcon}>💚</span>
                    <div>
                      <strong>Built-in Social Impact</strong>
                      <p>2% of sales auto-donate to green funds</p>
                    </div>
                  </div>
                  <div style={loginStyles.feature}>
                    <span style={loginStyles.featureIcon}>🔒</span>
                    <div>
                      <strong>Instant Settlements</strong>
                      <p>Get paid in cUSD immediately</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div style={loginStyles.footer}>
          <p>By continuing, you agree to our <a href="#" style={loginStyles.footerLink}>Terms of Service</a> and <a href="#" style={loginStyles.footerLink}>Privacy Policy</a></p>
        </div>
      </div>
    );
  };

  // Professional Marketplace Component
  const Marketplace = ({ user, onLogout }) => {
    const [products] = useState([
      { id: 1, name: " Coffee ", description: "Fair-trade coffee beans + reusable mug", price: "2", category: "food", impact: "Supports fair trade farmers", seller: "V78901", rating: "4.8" },
      { id: 2, name: " Okpa ", description: " Sweet Hot Okpa, Made from Beans grown in The School Farm", price: "5", category: "food", impact: "Supports student agriculture", seller: "V78902", rating: "4.9" },
      { id: 3, name: " UNN Hoodie ", description: "Organic cotton, eco-friendly dyes", price: "45", category: "clothing", impact: "Reduces fast fashion waste", seller: "V78903", rating: "4.7" },
      { id: 4, name: " Emeka&sons Bike Repair & Tune-up ", description: "Professional bike maintenance service", price: "25", category: "services", impact: "Promotes sustainable transport", seller: "V78904", rating: "4.9" },
      { id: 5, name: " GS HandBook ", description: "Recycled paper, plant-based cover", price: "80", category: "supplies", impact: "Saves trees", seller: "V78905", rating: "1.6" },
      { id: 6, name: " Meshai ", description: "Organic materials used in the baking", price: "0.8", category: "supplies", impact: "Saves trees", seller: "V78905", rating: "3" },
      { id: 7, name: " Bottle Water ", description: "Filtered from nature's finest streams", price: "1", category: "supplies", impact: "Saves trees", seller: "V78905", rating: "4.9" },
      { id: 8, name: " Rice ", description: "Locally plantyed and harvested rice", price: "10", category: "supplies", impact: "Saves trees", seller: "V78905", rating: "4.5" },
      { id: 9, name: " Tomato Paste ", description: "Processed from the finest ingredients", price: "0.2", category: "supplies", impact: "Saves trees", seller: "V78905", rating: "4" },
      { id: 10, name: " Bread ", description: "Made from good materials", price: "0.7", category: "supplies", impact: "Saves trees", seller: "V78905", rating: "3" },
      { id: 11, name: " Eggroll ", description: "Quick snack for the road", price: "0.5", category: "supplies", impact: "Saves trees", seller: "V78905", rating: "3.9" },
    ]);

    const [view, setView] = useState(user && user.userType === 'seller' ? 'seller' : 'buyer');
    const [walletConnected, setWalletConnected] = useState(false);
    const [showPurchase, setShowPurchase] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showListProduct, setShowListProduct] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: 'food' });

    const connectWallet = () => {
      alert("✅ Connected to Celo Wallet!\n\nFor demo: This would connect to your Celo Extension Wallet and show your cUSD balance.");
      setWalletConnected(true);
    };

    const buyProduct = (product) => {
      setSelectedProduct(product);
      setShowPurchase(true);
    };

    const confirmPurchase = () => {
      alert(`✅ PURCHASE SUCCESSFUL!\n\nYou bought: ${selectedProduct.name}\nAmount: ${selectedProduct.price} cUSD\nGreen Fund: ${(selectedProduct.price * 0.02).toFixed(2)} cUSD\n\nTransaction hash: 0x${Math.random().toString(16).substr(2, 64)}`);
      setShowPurchase(false);
      setSelectedProduct(null);
    };

    const listProduct = () => {
      alert(`🎉 PRODUCT LISTED!\n\n"${newProduct.name}" is now live on GreenPay!\nPrice: ${newProduct.price} cUSD\n\nAs a seller, you'll receive 98% of each sale, with 2% automatically supporting campus sustainability.`);
      setShowListProduct(false);
      setNewProduct({ name: '', description: '', price: '', category: 'food' });
    };

    const userGreeting = user ? `Welcome back, ${user.name}!` : 'Welcome to GreenPay!';

    return (
      <div style={marketplaceStyles.container}>
        {/* Header */}
        <div style={marketplaceStyles.header}>
          <div style={marketplaceStyles.headerTop}>
            <div style={marketplaceStyles.userInfo}>
              {user && user.avatar && (
                <img src={user.avatar} alt="User" style={marketplaceStyles.avatar} />
              )}
              <div>
                <div style={marketplaceStyles.userName}>
                  {userGreeting} 
                  <span style={{
                    ...marketplaceStyles.userTypeBadge,
                    background: user && user.userType === 'seller' ? '#ff6b6b' : '#35d07f'
                  }}>
                    {user && user.userType === 'seller' ? '🏪 Seller' : '🛍️ Buyer'}
                  </span>
                </div>
                <div style={marketplaceStyles.userId}>
                  {user && user.studentId} 
                  {user && user.userType === 'seller' && user.vendorName && ` • ${user.vendorName}`}
                </div>
              </div>
            </div>
            <div style={marketplaceStyles.headerActions}>
              {user && user.userType === 'seller' && (
                <button 
                  onClick={() => setShowListProduct(true)}
                  style={marketplaceStyles.listProductButton}
                >
                  + List Product
                </button>
              )}
              <button onClick={onLogout} style={marketplaceStyles.logoutButton}>
                Logout
              </button>
            </div>
          </div>
          
          <div style={marketplaceStyles.roleTabs}>
            <button 
              onClick={() => setView('buyer')}
              style={view === 'buyer' ? marketplaceStyles.activeRoleTab : marketplaceStyles.roleTab}
            >
              🛍️ Shop Marketplace
            </button>
            {user && user.userType === 'seller' && (
              <button 
                onClick={() => setView('seller')}
                style={view === 'seller' ? marketplaceStyles.activeRoleTab : marketplaceStyles.roleTab}
              >
                🏪 Seller Dashboard
              </button>
            )}
          </div>

          <h1 style={marketplaceStyles.title}>
            {view === 'buyer' ? '🌿 GreenPay - ReFi Marketplace' : '🏪 Seller Dashboard'}
          </h1>
          <p style={marketplaceStyles.subtitle}>
            {view === 'buyer' 
              ? 'Discover sustainable products • Every purchase funds campus green initiatives • Powered by Celo'
              : 'Manage your eco-business • Track impact • Grow with purpose'}
          </p>
          
          <button 
            onClick={connectWallet}
            style={walletConnected ? marketplaceStyles.connectedButton : marketplaceStyles.connectButton}
          >
            {walletConnected ? '✅ Celo Wallet Connected' : '🔗 Connect Celo Wallet'}
          </button>
        </div>

        {/* Impact Stats */}
        <div style={marketplaceStyles.stats}>
          <div style={marketplaceStyles.stat}>
            <div style={marketplaceStyles.statNumber}>1,247</div>
            <div style={marketplaceStyles.statLabel}>Products Sold</div>
          </div>
          <div style={marketplaceStyles.stat}>
            <div style={marketplaceStyles.statNumber}>284.5</div>
            <div style={marketplaceStyles.statLabel}>cUSD to Green Fund</div>
          </div>
          <div style={marketplaceStyles.stat}>
            <div style={marketplaceStyles.statNumber}>42</div>
            <div style={marketplaceStyles.statLabel}>Eco-Vendors</div>
          </div>
          <div style={marketplaceStyles.stat}>
            <div style={marketplaceStyles.statNumber}>896</div>
            <div style={marketplaceStyles.statLabel}>Student Buyers</div>
          </div>
        </div>

        {/* SELLER DASHBOARD VIEW */}
        {view === 'seller' && (
          <div style={marketplaceStyles.sellerDashboard}>
            <div style={marketplaceStyles.sellerStats}>
              <div style={marketplaceStyles.sellerStat}>
                <div style={marketplaceStyles.sellerStatNumber}>{user && user.totalSales ? user.totalSales : '1,240'}</div>
                <div style={marketplaceStyles.sellerStatLabel}>cUSD Revenue</div>
              </div>
              <div style={marketplaceStyles.sellerStat}>
                <div style={marketplaceStyles.sellerStatNumber}>24.8</div>
                <div style={marketplaceStyles.sellerStatLabel}>cUSD to Green Fund</div>
              </div>
              <div style={marketplaceStyles.sellerStat}>
                <div style={marketplaceStyles.sellerStatNumber}>{user && user.rating ? user.rating : '4.8'}</div>
                <div style={marketplaceStyles.sellerStatLabel}>Seller Rating</div>
              </div>
              <div style={marketplaceStyles.sellerStat}>
                <div style={marketplaceStyles.sellerStatNumber}>156</div>
                <div style={marketplaceStyles.sellerStatLabel}>Total Sales</div>
              </div>
            </div>

            <div style={marketplaceStyles.sellerActions}>
              <button 
                onClick={() => setShowListProduct(true)}
                style={marketplaceStyles.primaryButton}
              >
                + Add New Product
              </button>
              <button style={marketplaceStyles.secondaryButton}>
                📊 View Analytics
              </button>
              <button style={marketplaceStyles.secondaryButton}>
                💰 Withdraw Earnings
              </button>
            </div>

            <div style={marketplaceStyles.sellerProducts}>
              <h3>Your Listed Products</h3>
              <div style={marketplaceStyles.productsGrid}>
                {products.filter(p => p.seller === (user && user.studentId)).map(product => (
                  <div key={product.id} style={marketplaceStyles.productCard}>
                    <div style={marketplaceStyles.productHeader}>
                      <span style={marketplaceStyles.category}>{product.category}</span>
                      <span style={marketplaceStyles.price}>{product.price} cUSD</span>
                    </div>
                    <h3 style={marketplaceStyles.productName}>{product.name}</h3>
                    <p style={marketplaceStyles.description}>{product.description}</p>
                    <p style={marketplaceStyles.impact}>💚 {product.impact}</p>
                    <div style={marketplaceStyles.rating}>
                      ⭐ {product.rating}/5.0
                    </div>
                    <div style={marketplaceStyles.greenNote}>
                      🌱 ${(product.price * 0.02).toFixed(2)} to green fund per sale
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
            <div style={marketplaceStyles.marketplaceHeader}>
              <h2>Discover Sustainable Products</h2>
              <p>Every purchase automatically donates 2% to campus green initiatives</p>
            </div>
            <div style={marketplaceStyles.productsGrid}>
              {products.map(product => (
                <div key={product.id} style={marketplaceStyles.productCard}>
                  <div style={marketplaceStyles.productHeader}>
                    <span style={marketplaceStyles.category}>{product.category}</span>
                    <span style={marketplaceStyles.price}>{product.price} cUSD</span>
                  </div>
                  <h3 style={marketplaceStyles.productName}>{product.name}</h3>
                  <p style={marketplaceStyles.description}>{product.description}</p>
                  <p style={marketplaceStyles.impact}>💚 {product.impact}</p>
                  <div style={marketplaceStyles.rating}>
                    ⭐ {product.rating}/5.0
                  </div>
                  <button 
                    onClick={() => buyProduct(product)}
                    style={marketplaceStyles.buyButton}
                  >
                    Buy Now • {product.price} cUSD
                  </button>
                  <div style={marketplaceStyles.greenNote}>
                    🌱 ${(product.price * 0.02).toFixed(2)} to green fund
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Purchase Confirmation Modal */}
        {showPurchase && selectedProduct && (
          <div style={marketplaceStyles.modalOverlay}>
            <div style={marketplaceStyles.modal}>
              <h3>Confirm Your Purchase</h3>
              <div style={marketplaceStyles.purchaseDetails}>
                <h4>{selectedProduct.name}</h4>
                <p>{selectedProduct.description}</p>
                
                <div style={marketplaceStyles.priceBreakdown}>
                  <div style={marketplaceStyles.priceRow}>
                    <span>Product Price:</span>
                    <span><strong>{selectedProduct.price} cUSD</strong></span>
                  </div>
                  <div style={marketplaceStyles.priceRow}>
                    <span>Green Fund Contribution (2%):</span>
                    <span><strong style={{color: '#35d07f'}}>{(selectedProduct.price * 0.02).toFixed(2)} cUSD</strong></span>
                  </div>
                  <div style={{...marketplaceStyles.priceRow, ...marketplaceStyles.total}}>
                    <span>Vendor Receives:</span>
                    <span><strong>{(selectedProduct.price * 0.98).toFixed(2)} cUSD</strong></span>
                  </div>
                </div>
              </div>
              
              <div style={marketplaceStyles.modalButtons}>
                <button 
                  onClick={() => setShowPurchase(false)}
                  style={marketplaceStyles.cancelButton}
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmPurchase}
                  style={marketplaceStyles.confirmButton}
                >
                  Confirm Purchase
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Product Modal for Sellers */}
        {showListProduct && (
          <div style={marketplaceStyles.modalOverlay}>
            <div style={marketplaceStyles.modal}>
              <h3>List New Product</h3>
              <div style={marketplaceStyles.form}>
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  style={marketplaceStyles.input}
                />
                <textarea
                  placeholder="Product Description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  style={marketplaceStyles.textarea}
                />
                <input
                  type="number"
                  placeholder="Price in cUSD"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  style={marketplaceStyles.input}
                />
                <select 
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  style={marketplaceStyles.input}
                >
                  <option value="food">🍎 Food & Drinks</option>
                  <option value="clothing">👕 Clothing & Fashion</option>
                  <option value="services">🔧 Services</option>
                  <option value="events">🎫 Events & Tickets</option>
                  <option value="supplies">📚 Supplies & Books</option>
                  <option value="electronics">📱 Electronics</option>
                  <option value="home">🏠 Home & Garden</option>
                  <option value="lifestyle">💎 Lifestyle</option>
                </select>
                <div style={marketplaceStyles.modalButtons}>
                  <button 
                    onClick={() => setShowListProduct(false)}
                    style={marketplaceStyles.cancelButton}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={listProduct}
                    style={marketplaceStyles.confirmButton}
                  >
                    List Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Demo Ready Banner */}
        <div style={marketplaceStyles.demoInfo}>
          {/* <h3>🚀 Hackathon Demo - ReFi Marketplace on Celo</h3>
          <p><strong>Key Features Demonstrated:</strong></p>
          <div style={marketplaceStyles.featureList}>
            <div>✅ Role-based authentication (Buyer/Seller)</div>
            <div>✅ 12+ sustainable products across multiple categories</div>
            <div>✅ Automatic 2% green fund donations on every transaction</div>
            <div>✅ Seller dashboard with analytics</div>
            <div>✅ Celo wallet integration ready</div>
            <div>✅ Real-time impact tracking</div>
            <div>✅ Professional UI/UX design</div>
          </div> */}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      {currentView === 'login' && (
        <Login onLogin={handleLogin} />
      )}
      {currentView === 'marketplace' && (
        <Marketplace user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

// Login Styles
const loginStyles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #63e07aff 0%, #38c479ff 100%)',
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

// Marketplace Styles
const marketplaceStyles = {
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
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '15px',
    marginBottom: '30px'
  },
  stat: {
    background: 'white',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  statNumber: {
    fontSize: '2em',
    fontWeight: 'bold',
    color: '#35d07f'
  },
  statLabel: {
    color: '#666',
    fontSize: '14px'
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
  marketplaceHeader: {
    textAlign: 'center',
    marginBottom: '30px',
    background: 'white',
    padding: '20px',
    borderRadius: '12px'
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
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
    color: '#333',
    fontSize: '1.1em'
  },
  description: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '10px',
    lineHeight: '1.4'
  },
  impact: {
    color: '#2e8b57',
    fontSize: '12px',
    fontStyle: 'italic',
    marginBottom: '10px'
  },
  rating: {
    fontSize: '12px',
    color: '#ffa500',
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
    marginBottom: '8px',
    fontSize: '14px'
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
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto'
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
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '25px',
    borderRadius: '12px',
    marginTop: '40px',
    textAlign: 'center'
  },
  featureList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '10px',
    marginTop: '15px',
    textAlign: 'left'

  }
};

  const styles = {
    // Mobile-first responsive styles
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #35d07f 0%, #2e8b57 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      '@media (max-width: 768px)': {
        padding: '10px',
      },
      '@media (max-width: 480px)': {
        padding: '5px',
      }
    },
    loginCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '40px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '500px',
      textAlign: 'center',
      marginBottom: '20px',
      '@media (max-width: 768px)': {
        padding: '30px 20px',
        marginBottom: '15px',
      },
      '@media (max-width: 480px)': {
        padding: '20px 15px',
        borderRadius: '12px',
      }
    },
    walletConnectCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '30px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '500px',
      textAlign: 'center',
      '@media (max-width: 768px)': {
        padding: '25px 15px',
      },
      '@media (max-width: 480px)': {
        padding: '20px 10px',
      }
    },
    title: {
      color: '#2e8b57',
      marginBottom: '10px',
      fontSize: '2.5em',
      '@media (max-width: 768px)': {
        fontSize: '2em',
      },
      '@media (max-width: 480px)': {
        fontSize: '1.8em',
      }
    },
    subtitle: {
      color: '#666',
      marginBottom: '30px',
      fontSize: '1.2em',
      '@media (max-width: 768px)': {
        fontSize: '1.1em',
        marginBottom: '20px',
      },
      '@media (max-width: 480px)': {
        fontSize: '1em',
      }
    },
    roleButtons: {
      marginBottom: '20px',
      '@media (max-width: 480px)': {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }
    },
    roleButton: (isActive) => ({
      margin: '5px',
      padding: '12px 24px',
      background: isActive ? '#35d07f' : '#f8f9fa',
      color: isActive ? 'white' : '#666',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      '@media (max-width: 768px)': {
        padding: '10px 20px',
        fontSize: '14px',
      },
      '@media (max-width: 480px)': {
        padding: '12px 16px',
        fontSize: '14px',
        width: '100%',
        margin: '2px 0',
      }
    }),
    primaryButton: {
      width: '100%',
      background: '#35d07f',
      color: 'white',
      border: 'none',
      padding: '15px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginBottom: '15px',
      '@media (max-width: 768px)': {
        padding: '12px',
        fontSize: '15px',
      },
      '@media (max-width: 480px)': {
        padding: '14px',
        fontSize: '14px',
      }
    },
    walletConnectButton: {
      width: '100%',
      background: 'linear-gradient(135deg, #35d07f 0%, #2e8b57 100%)',
      color: 'white',
      border: 'none',
      padding: '15px',
      borderRadius: '10px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      marginBottom: '15px',
      '@media (max-width: 768px)': {
        padding: '12px',
        fontSize: '15px',
      },
      '@media (max-width: 480px)': {
        padding: '14px',
        fontSize: '14px',
      }
    },
    // Marketplace styles
    marketplaceContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      background: '#f5f5f5',
      minHeight: '100vh',
      '@media (max-width: 768px)': {
        padding: '15px',
      },
      '@media (max-width: 480px)': {
        padding: '10px',
      }
    },
    header: {
      background: 'white',
      padding: '30px',
      borderRadius: '12px',
      marginBottom: '20px',
      textAlign: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      '@media (max-width: 768px)': {
        padding: '20px',
      },
      '@media (max-width: 480px)': {
        padding: '15px',
        marginBottom: '15px',
      }
    },
    headerActions: {
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      alignItems: 'center',
      flexWrap: 'wrap',
      '@media (max-width: 480px)': {
        flexDirection: 'column',
        gap: '10px',
      }
    },
    connectedInfo: {
      background: '#f0f8f0',
      padding: '10px 20px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      '@media (max-width: 480px)': {
        padding: '8px 15px',
        fontSize: '14px',
      }
    },
    actionButton: {
      background: '#35d07f',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      '@media (max-width: 480px)': {
        padding: '8px 16px',
        fontSize: '14px',
        width: '100%',
      }
    },
    logoutButton: {
      background: '#ff6b6b',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      '@media (max-width: 480px)': {
        padding: '8px 16px',
        fontSize: '14px',
        width: '100%',
      }
    },
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px',
      marginBottom: '40px',
      '@media (max-width: 768px)': {
        gap: '15px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      },
      '@media (max-width: 480px)': {
        gridTemplateColumns: '1fr',
        gap: '15px',
        marginBottom: '30px',
      }
    },
    productCard: {
      background: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      textAlign: 'center',
      '@media (max-width: 480px)': {
        padding: '15px',
      }
    },
    productHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
      '@media (max-width: 480px)': {
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'flex-start',
      }
    },
    category: {
      background: '#e6f3ff',
      padding: '4px 8px',
      borderRadius: '6px',
      fontSize: '12px',
      color: '#0066cc',
      '@media (max-width: 480px)': {
        fontSize: '11px',
      }
    },
    price: {
      fontWeight: 'bold',
      color: '#35d07f',
      fontSize: '1.2em',
      '@media (max-width: 480px)': {
        fontSize: '1.1em',
      }
    },
    productName: {
      margin: '10px 0',
      color: '#333',
      '@media (max-width: 480px)': {
        fontSize: '1.1em',
        margin: '8px 0',
      }
    },
    productDescription: {
      color: '#666',
      fontSize: '14px',
      marginBottom: '15px',
      '@media (max-width: 480px)': {
        fontSize: '13px',
      }
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
      marginBottom: '8px',
      '@media (max-width: 480px)': {
        padding: '10px',
        fontSize: '14px',
      }
    },
    greenNote: {
      fontSize: '11px',
      color: '#35d07f',
      '@media (max-width: 480px)': {
        fontSize: '10px',
      }
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
      zIndex: 1000,
      padding: '20px',
      '@media (max-width: 480px)': {
        padding: '10px',
      }
    },
    modal: {
      background: 'white',
      padding: '30px',
      borderRadius: '12px',
      maxWidth: '500px',
      width: '90%',
      '@media (max-width: 768px)': {
        padding: '25px',
      },
      '@media (max-width: 480px)': {
        padding: '20px',
        width: '95%',
      }
    },
    modalButtons: {
      display: 'flex',
      gap: '10px',
      '@media (max-width: 480px)': {
        flexDirection: 'column',
      }
    },
    cancelButton: {
      flex: 1,
      background: '#6c757d',
      color: 'white',
      border: 'none',
      padding: '12px',
      borderRadius: '6px',
      cursor: 'pointer',
      '@media (max-width: 480px)': {
        padding: '10px',
      }
    },
    confirmButton: {
      flex: 1,
      background: '#35d07f',
      color: 'white',
      border: 'none',
      padding: '12px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 'bold',
      '@media (max-width: 480px)': {
        padding: '10px',
      }
    },
    demoInfo: {
      background: '#fff3cd',
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #ffeaa7',
      marginTop: '20px',
      '@media (max-width: 480px)': {
        padding: '15px',
        marginTop: '15px',
      }
    },
    walletIcons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      fontSize: '20px',
      '@media (max-width: 480px)': {
        gap: '15px',
        fontSize: '18px',
      }
    }
  };
export default App;
