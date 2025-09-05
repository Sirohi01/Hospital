    import React, { useState, useEffect } from 'react';
    import { 
    FaUtensils, 
    FaPlus, 
    FaCheck, 
    FaClock, 
    FaTrash, 
    FaSearch,
    FaUser,
    FaMoneyBillWave,
    FaReceipt
    } from 'react-icons/fa';
    import '../styles/CanteenManagement.css';

    function Canteen() {
    const [orders, setOrders] = useState([]);
    const [newOrder, setNewOrder] = useState({
        item: '',
        quantity: 1,
        tableNumber: '',
        specialRequest: ''
    });
    
    const [menu, setMenu] = useState([
        { id: 1, name: 'Veg Sandwich', price: 3.50, category: 'Food' },
    { id: 2, name: 'Pasta', price: 5.00, category: 'Food' },
    { id: 3, name: 'Coffee', price: 2.00, category: 'Beverage' },
    { id: 4, name: 'Tea', price: 1.50, category: 'Beverage' },
    { id: 5, name: 'Salad', price: 4.00, category: 'Food' },
    { id: 6, name: 'Soup', price: 3.00, category: 'Food' },
    { id: 7, name: 'Juice', price: 2.50, category: 'Beverage' },
    { id: 8, name: 'Paneer Wrap', price: 5.50, category: 'Food' },
    { id: 9, name: 'Burger', price: 6.00, category: 'Food' },
    { id: 10, name: 'French Fries', price: 3.00, category: 'Food' },
    { id: 11, name: 'Fruit Bowl', price: 4.50, category: 'Food' },
    { id: 12, name: 'Milkshake', price: 3.50, category: 'Beverage' },
    { id: 13, name: 'Lemonade', price: 2.00, category: 'Beverage' },
    { id: 14, name: 'Iced Tea', price: 2.50, category: 'Beverage' },
    { id: 15, name: 'Chocolate Brownie', price: 3.00, category: 'Dessert' },
    { id: 16, name: 'Ice Cream', price: 2.50, category: 'Dessert' },
    { id: 17, name: 'Muffin', price: 2.00, category: 'Dessert' },
    { id: 18, name: 'Smoothie', price: 3.50, category: 'Beverage' },
    { id: 19, name: 'Grilled Sandwich', price: 4.50, category: 'Food' },
    { id: 20, name: 'Hot Chocolate', price: 3.00, category: 'Beverage' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('orders');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update current time every minute
    useEffect(() => {
        const timer = setInterval(() => {
        setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(timer);
    }, []);

    const handleAddOrder = () => {
        if (newOrder.item.trim() !== '' && newOrder.tableNumber.trim() !== '') {
        const selectedMenuItem = menu.find(item => item.name === newOrder.item);
        const order = {
            id: Date.now(),
            item: newOrder.item,
            quantity: newOrder.quantity,
            tableNumber: newOrder.tableNumber,
            specialRequest: newOrder.specialRequest,
            price: selectedMenuItem ? selectedMenuItem.price * newOrder.quantity : 0,
            status: 'Pending',
            time: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setOrders([...orders, order]);
        setNewOrder({
            item: '',
            quantity: 1,
            tableNumber: '',
            specialRequest: ''
        });
        }
    };

    const handleStatusChange = (id, newStatus) => {
        setOrders(orders.map(order => 
        order.id === id ? { ...order, status: newStatus } : order
        ));
    };

    const handleDeleteOrder = (id) => {
        setOrders(orders.filter(order => order.id !== id));
    };

    const filteredMenu = menu.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === 'All' || item.category === selectedCategory)
    );

    const categories = ['All', ...new Set(menu.map(item => item.category))];

    const pendingOrders = orders.filter(order => order.status === 'Pending');
    const completedOrders = orders.filter(order => order.status === 'Completed');

    const totalRevenue = orders
        .filter(order => order.status === 'Completed')
        .reduce((sum, order) => sum + order.price, 0);

    return (
        <div className="canteen-enhanced">
        <div className="canteen-header">
            <h2 className="canteen-title">
            <FaUtensils className="header-icon" />
            Hospital Canteen Management
            </h2>
            <div className="time-display">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            {' • '}
            {currentTime.toLocaleDateString()}
            </div>
        </div>

        <div className="tabs">
            <button 
            className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
            >
            <FaUtensils className="tab-icon" />
            Orders
            </button>
            <button 
            className={`tab ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu')}
            >
            <FaReceipt className="tab-icon" />
            Menu Management
            </button>
            <button 
            className={`tab ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
            >
            <FaMoneyBillWave className="tab-icon" />
            Reports
            </button>
        </div>

        {activeTab === 'orders' && (
            <div className="orders-container">
            <div className="order-grid">
                <div className="new-order-section">
                <h3>
                    <FaPlus className="section-icon" />
                    New Order
                </h3>
                
                <div className="form-group">
                    <label>Select Item</label>
                    <select
                    value={newOrder.item}
                    onChange={(e) => setNewOrder({...newOrder, item: e.target.value})}
                    >
                    <option value="">-- Select Item --</option>
                    {menu.map(item => (
                        <option key={item.id} value={item.name}>
                        {item.name} (${item.price.toFixed(2)})
                        </option>
                    ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Quantity</label>
                    <input
                    type="number"
                    min="1"
                    value={newOrder.quantity}
                    onChange={(e) => setNewOrder({...newOrder, quantity: parseInt(e.target.value) || 1})}
                    />
                </div>

                <div className="form-group">
                    <label>
                    <FaUser className="input-icon" />
                    Table/Ward Number
                    </label>
                    <input
                    type="text"
                    value={newOrder.tableNumber}
                    onChange={(e) => setNewOrder({...newOrder, tableNumber: e.target.value})}
                    placeholder="e.g., Table 5 or Ward 3B"
                    />
                </div>

                <div className="form-group">
                    <label>Special Requests</label>
                    <textarea
                    value={newOrder.specialRequest}
                    onChange={(e) => setNewOrder({...newOrder, specialRequest: e.target.value})}
                    placeholder="Allergies, dietary restrictions, etc."
                    />
                </div>

                <button 
                    className="add-order-btn"
                    onClick={handleAddOrder}
                    disabled={!newOrder.item || !newOrder.tableNumber}
                >
                    Add Order
                </button>
                </div>

                <div className="orders-list-section">
                <div className="orders-tabs">
                    <div className={`orders-tab ${pendingOrders.length > 0 ? 'active' : ''}`}>
                    <FaClock className="tab-icon" />
                    Pending ({pendingOrders.length})
                    </div>
                    <div className={`orders-tab ${completedOrders.length > 0 ? '' : 'disabled'}`}>
                    <FaCheck className="tab-icon" />
                    Completed ({completedOrders.length})
                    </div>
                </div>

                <div className="orders-list">
                    {pendingOrders.length === 0 && completedOrders.length === 0 ? (
                    <div className="no-orders">
                        No orders placed yet
                    </div>
                    ) : (
                    <>
                        {pendingOrders.map(order => (
                        <div key={order.id} className="order-card pending">
                            <div className="order-header">
                            <span className="order-id">#{order.id.toString().slice(-4)}</span>
                            <span className="order-time">{order.time}</span>
                            </div>
                            <div className="order-details">
                            <h4>{order.item} × {order.quantity}</h4>
                            <p className="order-table">
                                <FaUser className="icon" />
                                {order.tableNumber}
                            </p>
                            {order.specialRequest && (
                                <p className="order-request">
                                <FaExclamationTriangle className="icon" />
                                {order.specialRequest}
                                </p>
                            )}
                            <p className="order-price">${order.price.toFixed(2)}</p>
                            </div>
                            <div className="order-actions">
                            <button 
                                className="complete-btn"
                                onClick={() => handleStatusChange(order.id, 'Completed')}
                            >
                                <FaCheck /> Complete
                            </button>
                            <button 
                                className="delete-btn"
                                onClick={() => handleDeleteOrder(order.id)}
                            >
                                <FaTrash /> Cancel
                            </button>
                            </div>
                        </div>
                        ))}

                        {completedOrders.map(order => (
                        <div key={order.id} className="order-card completed">
                            <div className="order-header">
                            <span className="order-id">#{order.id.toString().slice(-4)}</span>
                            <span className="order-time">{order.time}</span>
                            </div>
                            <div className="order-details">
                            <h4>{order.item} × {order.quantity}</h4>
                            <p className="order-table">
                                <FaUser className="icon" />
                                {order.tableNumber}
                            </p>
                            <p className="order-price">${order.price.toFixed(2)}</p>
                            </div>
                            <div className="order-status">
                            <FaCheck className="icon" />
                            Completed
                            </div>
                        </div>
                        ))}
                    </>
                    )}
                </div>
                </div>
            </div>
            </div>
        )}

        {activeTab === 'menu' && (
            <div className="menu-container">
            <div className="menu-controls">
                <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                </div>
                <div className="category-filter">
                {categories.map(category => (
                    <button
                    key={category}
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                    >
                    {category}
                    </button>
                ))}
                </div>
            </div>

            <div className="menu-items">
                {filteredMenu.length > 0 ? (
                <table>
                    <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredMenu.map(item => (
                        <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>
                            <span className={`category-tag ${item.category.toLowerCase()}`}>
                            {item.category}
                            </span>
                        </td>
                        <td>${item.price.toFixed(2)}</td>
                        <td className="actions">
                            <button className="edit-btn">
                            Edit
                            </button>
                            <button className="delete-btn">
                            Delete
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                ) : (
                <div className="no-items">
                    No menu items found
                </div>
                )}
            </div>

            <div className="add-item-form">
                <h3>
                <FaPlus className="section-icon" />
                Add New Menu Item
                </h3>
                <div className="form-row">
                <input type="text" placeholder="Item name" />
                <select>
                    <option value="">Select category</option>
                    <option value="Food">Food</option>
                    <option value="Beverage">Beverage</option>
                    <option value="Snack">Snack</option>
                </select>
                <input type="number" placeholder="Price" min="0" step="0.01" />
                <button className="add-btn">
                    Add Item
                </button>
                </div>
            </div>
            </div>
        )}

        {activeTab === 'reports' && (
            <div className="reports-container">
            <div className="stats-cards">
                <div className="stat-card">
                <h3>Today's Orders</h3>
                <p className="stat-value">{orders.length}</p>
                <p className="stat-label">Total orders placed</p>
                </div>
                <div className="stat-card">
                <h3>Pending Orders</h3>
                <p className="stat-value">{pendingOrders.length}</p>
                <p className="stat-label">Awaiting completion</p>
                </div>
                <div className="stat-card revenue">
                <h3>Today's Revenue</h3>
                <p className="stat-value">${totalRevenue.toFixed(2)}</p>
                <p className="stat-label">From completed orders</p>
                </div>
            </div>

            <div className="popular-items">
                <h3>
                <FaUtensils className="section-icon" />
                Most Popular Items
                </h3>
                <div className="popular-list">
                {/* Would implement actual popularity logic */}
                <div className="popular-item">
                    <span className="item-name">Pasta</span>
                    <div className="popularity-bar">
                    <div className="bar-fill" style={{ width: '75%' }}></div>
                    </div>
                    <span className="item-count">12 orders</span>
                </div>
                <div className="popular-item">
                    <span className="item-name">Coffee</span>
                    <div className="popularity-bar">
                    <div className="bar-fill" style={{ width: '60%' }}></div>
                    </div>
                    <span className="item-count">9 orders</span>
                </div>
                <div className="popular-item">
                    <span className="item-name">Veg Sandwich</span>
                    <div className="popularity-bar">
                    <div className="bar-fill" style={{ width: '45%' }}></div>
                    </div>
                    <span className="item-count">7 orders</span>
                </div>
                </div>
            </div>

            <div className="time-chart">
                <h3>
                <FaClock className="section-icon" />
                Order Activity by Hour
                </h3>
                <div className="chart-placeholder">
                {/* Would implement a chart library here */}
                <p>Order activity chart would display here</p>
                </div>
            </div>
            </div>
        )}
        </div>
    );
    }

    export default Canteen;