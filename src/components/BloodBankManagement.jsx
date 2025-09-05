    import React, { useState, useEffect } from 'react';
    import { 
    FaTint, 
    FaUser, 
    FaSearch, 
    FaPlus, 
    FaHistory,
    FaCalendarAlt,
    FaFlask,
    FaExclamationTriangle,
    FaCheckCircle,
    FaTimesCircle,
    FaEdit,
    FaTrash,
    FaChartPie
    } from 'react-icons/fa';
    import '../styles/BloodBankManagement.css';

    function BloodBankEnhanced() {
    const [bloodData, setBloodData] = useState({
        donationId: `DON-${Math.floor(Math.random() * 10000)}`,
        donorName: '',
        donorId: '',
        bloodGroup: '',
        units: '',
        donationDate: new Date().toISOString().split('T')[0],
        expiryDate: '',
        status: 'Available',
        testResults: 'Pending',
        notes: ''
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('donate');
    const [inventory, setInventory] = useState([
        {
        id: 1,
        donationId: 'DON-1001',
        donorName: 'John Smith',
        donorId: 'DNR-001',
        bloodGroup: 'A+',
        units: 2,
        donationDate: '2023-06-15',
        expiryDate: '2023-09-15',
        status: 'Available',
        testResults: 'Cleared'
        },
        {
        id: 2,
        donationId: 'DON-1002',
        donorName: 'Maria Garcia',
        donorId: 'DNR-002',
        bloodGroup: 'O-',
        units: 1,
        donationDate: '2023-06-10',
        expiryDate: '2023-09-10',
        status: 'Reserved',
        testResults: 'Cleared'
        },
        {
        id: 3,
        donationId: 'DON-1003',
        donorName: 'Robert Chen',
        donorId: 'DNR-003',
        bloodGroup: 'B+',
        units: 1.5,
        donationDate: '2023-06-05',
        expiryDate: '2023-09-05',
        status: 'Used',
        testResults: 'Cleared'
        }
    ]);

    const [bloodStock, setBloodStock] = useState({
        'A+': { total: 0, available: 0 },
        'A-': { total: 0, available: 0 },
        'B+': { total: 0, available: 0 },
        'B-': { total: 0, available: 0 },
        'AB+': { total: 0, available: 0 },
        'AB-': { total: 0, available: 0 },
        'O+': { total: 0, available: 0 },
        'O-': { total: 0, available: 0 }
    });

    // Calculate blood stock levels
    useEffect(() => {
        const stock = { ...bloodStock };
        inventory.forEach(item => {
        if (item.status === 'Available') {
            stock[item.bloodGroup].available += item.units;
        }
        stock[item.bloodGroup].total += item.units;
        });
        setBloodStock(stock);
    }, [bloodStock, inventory]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBloodData(prev => ({
        ...prev,
        [name]: value,
        ...(name === 'donationDate' && {
            expiryDate: calculateExpiryDate(value)
        })
        }));
    };

    const calculateExpiryDate = (donationDate) => {
        if (!donationDate) return '';
        const date = new Date(donationDate);
        date.setDate(date.getDate() + 42); 
        return date.toISOString().split('T')[0];
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newDonation = {
        id: inventory.length + 1,
        ...bloodData,
        expiryDate: bloodData.expiryDate || calculateExpiryDate(bloodData.donationDate)
        };
        setInventory([...inventory, newDonation]);
        alert('Blood donation record saved successfully!');
        resetForm();
    };

    const resetForm = () => {
        setBloodData({
        donationId: `DON-${Math.floor(Math.random() * 10000)}`,
        donorName: '',
        donorId: '',
        bloodGroup: '',
        units: '',
        donationDate: new Date().toISOString().split('T')[0],
        expiryDate: '',
        status: 'Available',
        testResults: 'Pending',
        notes: ''
        });
    };

    const updateStatus = (id, newStatus) => {
        setInventory(inventory.map(item => 
        item.id === id ? { ...item, status: newStatus } : item
        ));
    };

    const deleteRecord = (id) => {
        setInventory(inventory.filter(item => item.id !== id));
    };

    const filteredInventory = inventory.filter(item =>
        item.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.donationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bloodbank-enhanced">
        <div className="bloodbank-header">
            <h2 className="bloodbank-title">
            <FaTint className="header-icon" />
            Blood Bank Management
            </h2>
            <p className="bloodbank-subtitle">Track donations and manage blood inventory</p>
        </div>

        <div className="tabs">
            <button 
            className={`tab ${activeTab === 'donate' ? 'active' : ''}`}
            onClick={() => setActiveTab('donate')}
            >
            <FaPlus className="tab-icon" />
            New Donation
            </button>
            <button 
            className={`tab ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
            >
            <FaHistory className="tab-icon" />
            View Inventory
            </button>
            <button 
            className={`tab ${activeTab === 'stock' ? 'active' : ''}`}
            onClick={() => setActiveTab('stock')}
            >
            <FaChartPie className="tab-icon" />
            Stock Levels
            </button>
        </div>

        {activeTab === 'donate' && (
            <form onSubmit={handleSubmit} className="donation-form">
            <div className="form-section">
                <div className="section-header">
                <FaTint className="section-icon" />
                <h3>Blood Donation Record</h3>
                </div>
                
                <div className="form-grid">
                <div className="form-group">
                    <label className="form-label">
                    <FaUser className="input-icon" />
                    Donor Name *
                    </label>
                    <input
                    type="text"
                    name="donorName"
                    className="form-input"
                    value={bloodData.donorName}
                    onChange={handleChange}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaUser className="input-icon" />
                    Donor ID
                    </label>
                    <input
                    type="text"
                    name="donorId"
                    className="form-input"
                    value={bloodData.donorId}
                    onChange={handleChange}
                    placeholder="Optional"
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaTint className="input-icon" />
                    Blood Group *
                    </label>
                    <select
                    name="bloodGroup"
                    className="form-input"
                    value={bloodData.bloodGroup}
                    onChange={handleChange}
                    required
                    >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    </select>
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaTint className="input-icon" />
                    Units Donated *
                    </label>
                    <input
                    type="number"
                    name="units"
                    className="form-input"
                    value={bloodData.units}
                    onChange={handleChange}
                    min="0.5"
                    max="2"
                    step="0.5"
                    required
                    />
                    <small className="input-hint">(Typically 0.5-2 units)</small>
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaCalendarAlt className="input-icon" />
                    Donation Date *
                    </label>
                    <input
                    type="date"
                    name="donationDate"
                    className="form-input"
                    value={bloodData.donationDate}
                    onChange={handleChange}
                    max={new Date().toISOString().split('T')[0]}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaExclamationTriangle className="input-icon" />
                    Expiry Date
                    </label>
                    <input
                    type="date"
                    name="expiryDate"
                    className="form-input"
                    value={bloodData.expiryDate}
                    onChange={handleChange}
                    readOnly
                    />
                    <small className="input-hint">(Auto-calculated 42 days after donation)</small>
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaFlask className="input-icon" />
                    Test Results *
                    </label>
                    <select
                    name="testResults"
                    className="form-input"
                    value={bloodData.testResults}
                    onChange={handleChange}
                    required
                    >
                    <option value="Pending">Pending</option>
                    <option value="Cleared">Cleared</option>
                    <option value="Rejected">Rejected</option>
                    </select>
                </div>
                
                <div className="form-group full-width">
                    <label className="form-label">
                    Additional Notes
                    </label>
                    <textarea
                    name="notes"
                    className="form-input"
                    rows="3"
                    value={bloodData.notes}
                    onChange={handleChange}
                    ></textarea>
                </div>
                </div>
            </div>
            
            <div className="form-actions">
                <button
                type="submit"
                className="primary-button"
                >
                Save Donation Record
                </button>
            </div>
            </form>
        )}

        {activeTab === 'inventory' && (
            <div className="inventory-container">
            <div className="search-container">
                <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search donations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                </div>
            </div>
            
            {filteredInventory.length > 0 ? (
                <div className="inventory-list">
                <table>
                    <thead>
                    <tr>
                        <th>Donation ID</th>
                        <th>Donor</th>
                        <th>Blood Group</th>
                        <th>Units</th>
                        <th>Donation Date</th>
                        <th>Expiry Date</th>
                        <th>Status</th>
                        <th>Tests</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredInventory.map(item => (
                        <tr key={item.id}>
                        <td>{item.donationId}</td>
                        <td>{item.donorName}</td>
                        <td>
                            <span className={`blood-group ${item.bloodGroup.replace('+', 'pos').replace('-', 'neg')}`}>
                            {item.bloodGroup}
                            </span>
                        </td>
                        <td>{item.units}</td>
                        <td>{item.donationDate}</td>
                        <td className={new Date(item.expiryDate) < new Date() ? 'expired' : ''}>
                            {item.expiryDate}
                        </td>
                        <td>
                            <span className={`status-badge ${item.status.toLowerCase()}`}>
                            {item.status}
                            </span>
                        </td>
                        <td>
                            <span className={`test-result ${item.testResults.toLowerCase()}`}>
                            {item.testResults}
                            </span>
                        </td>
                        <td className="actions">
                            <button 
                            className="action-button edit-button"
                            onClick={() => console.log('Edit:', item.id)}
                            >
                            <FaEdit />
                            </button>
                            <button 
                            className="action-button delete-button"
                            onClick={() => {
                                if (window.confirm('Delete this donation record?')) {
                                deleteRecord(item.id);
                                }
                            }}
                            >
                            <FaTrash />
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            ) : (
                <div className="no-records">
                No donation records found
                </div>
            )}
            </div>
        )}

        {activeTab === 'stock' && (
            <div className="stock-container">
            <h3>Current Blood Stock Levels</h3>
            
            <div className="stock-levels">
                {Object.entries(bloodStock).map(([group, data]) => (
                <div key={group} className="stock-item">
                    <div className="blood-group-label">
                    <span className={`blood-group ${group.replace('+', 'pos').replace('-', 'neg')}`}>
                        {group}
                    </span>
                    </div>
                    <div className="stock-bar-container">
                    <div 
                        className="stock-bar-total"
                        style={{ width: '100%' }}
                    >
                        <div 
                        className="stock-bar-available"
                        style={{ width: `${(data.available / (data.total || 1)) * 100}%` }}
                        ></div>
                    </div>
                    </div>
                    <div className="stock-numbers">
                    <span className="available">{data.available.toFixed(1)}</span>
                    <span>/</span>
                    <span className="total">{data.total.toFixed(1)} units</span>
                    </div>
                </div>
                ))}
            </div>
            
            <div className="stock-summary">
                <div className="summary-card">
                <h4>Total Available</h4>
                <p className="total-units">
                    {Object.values(bloodStock).reduce((sum, group) => sum + group.available, 0).toFixed(1)} units
                </p>
                </div>
                <div className="summary-card critical">
                <h4>Critical Levels</h4>
                <p className="critical-groups">
                    {Object.entries(bloodStock)
                    .filter(([_, group]) => group.available < 2)
                    .map(([group]) => group)
                    .join(', ') || 'None'}
                </p>
                </div>
            </div>
            </div>
        )}
        </div>
    );
    }

    export default BloodBankEnhanced;