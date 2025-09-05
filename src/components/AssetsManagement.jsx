import React, { useState } from 'react';
import '../styles/AssetsManagement.css';

const AssetsManagement = () => {
    const [assets, setAssets] = useState([
        { 
            id: 1, 
            name: 'Hospital Bed', 
            model: 'MediComfort 5000', 
            serialNumber: 'BED-2023-001', 
            quantity: 50, 
            available: 35,
            inUse: 15,
            underRepair: 0,
            department: 'General Ward',
            lastMaintenance: '2023-05-15',
            nextMaintenance: '2023-11-15',
            status: 'Available',
            priority: 'Medium'
        },
        { 
            id: 2, 
            name: 'Wheelchair', 
            model: 'RollEase Pro', 
            serialNumber: 'WC-2022-045', 
            quantity: 15, 
            available: 5,
            inUse: 10,
            underRepair: 0,
            department: 'Emergency',
            lastMaintenance: '2023-04-20',
            nextMaintenance: '2023-10-20',
            status: 'In Use',
            priority: 'Low'
        },
        { 
            id: 3, 
            name: 'Heart Monitor', 
            model: 'CardioTrack X3', 
            serialNumber: 'HM-2023-012', 
            quantity: 10, 
            available: 6,
            inUse: 2,
            underRepair: 2,
            department: 'ICU',
            lastMaintenance: '2023-03-10',
            nextMaintenance: '2023-09-10',
            status: 'Under Repair',
            priority: 'High'
        },
    ]);

    const [newAsset, setNewAsset] = useState({
        name: '',
        model: '',
        serialNumber: '',
        quantity: '',
        available: '',
        inUse: '',
        underRepair: '',
        department: '',
        lastMaintenance: '',
        nextMaintenance: '',
        status: 'Available',
        priority: 'Medium'
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterDepartment, setFilterDepartment] = useState('All');
    const [editingId, setEditingId] = useState(null);
    const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
    const [maintenanceRecord, setMaintenanceRecord] = useState({
        assetId: null,
        date: '',
        technician: '',
        type: 'Routine',
        notes: '',
        partsReplaced: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAsset({
            ...newAsset,
            [name]: value
        });
    };

    const handleMaintenanceChange = (e) => {
        setMaintenanceRecord({
            ...maintenanceRecord,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Calculate available quantity if not provided
        const availableQty = newAsset.available || 
        (
            newAsset.quantity -
            (parseInt(newAsset.inUse || 0) - parseInt(newAsset.underRepair || 0))
        );          
        
            const assetData = {
                ...newAsset,
                quantity: parseInt(newAsset.quantity),
                available: parseInt(availableQty),
                inUse: parseInt(newAsset.inUse || 0),
            };              

        if (editingId) {
            setAssets(assets.map(asset => 
                asset.id === editingId ? { ...assetData, id: editingId } : asset
            ));
            setEditingId(null);
        } else {
            setAssets([...assets, { 
                id: assets.length > 0 ? Math.max(...assets.map(a => a.id)) + 1 : 1, 
                ...assetData
            }]);
        }
        
        setNewAsset({ 
            name: '',
            model: '',
            serialNumber: '',
            quantity: '',
            available: '',
            inUse: '',
            underRepair: '',
            department: '',
            lastMaintenance: '',
            nextMaintenance: '',
            status: 'Available',
            priority: 'Medium'
        });
    };

    const handleMaintenanceSubmit = (e) => {
        e.preventDefault();
        const updatedAssets = assets.map(asset => {
            if (asset.id === maintenanceRecord.assetId) {
                return {
                    ...asset,
                    status: 'Available',
                    lastMaintenance: maintenanceRecord.date,
                    nextMaintenance: calculateNextMaintenanceDate(maintenanceRecord.date, 6), // 6 months later
                    underRepair: Math.max(0, asset.underRepair - 1),
                    available: asset.available + 1
                };
            }
            return asset;
        });
        
        setAssets(updatedAssets);
        setShowMaintenanceForm(false);
        setMaintenanceRecord({
            assetId: null,
            date: '',
            technician: '',
            type: 'Routine',
            notes: '',
            partsReplaced: ''
        });
    };

    const calculateNextMaintenanceDate = (date, months) => {
        const d = new Date(date);
        d.setMonth(d.getMonth() + months);
        return d.toISOString().split('T')[0];
    };

    const handleEdit = (asset) => {
        setNewAsset(asset);
        setEditingId(asset.id);
    };

    const handleDelete = (id) => {
        setAssets(assets.filter(asset => asset.id !== id));
    };

    const handleStatusChange = (id, newStatus) => {
        setAssets(assets.map(asset => {
            if (asset.id === id) {
                let available = asset.available;
                let inUse = asset.inUse;
                let underRepair = asset.underRepair;
                
                if (newStatus === 'Available') {
                    available += 1;
                    if (asset.status === 'In Use') inUse -= 1;
                    if (asset.status === 'Under Repair') underRepair -= 1;
                } else if (newStatus === 'In Use') {
                    inUse += 1;
                    if (asset.status === 'Available') available -= 1;
                    if (asset.status === 'Under Repair') underRepair -= 1;
                } else if (newStatus === 'Under Repair') {
                    underRepair += 1;
                    if (asset.status === 'Available') available -= 1;
                    if (asset.status === 'In Use') inUse -= 1;
                }
                
                return {
                    ...asset,
                    status: newStatus,
                    available,
                    inUse,
                    underRepair
                };
            }
            return asset;
        }));
    };

    const startMaintenance = (id) => {
        setMaintenanceRecord({
            ...maintenanceRecord,
            assetId: id,
            date: new Date().toISOString().split('T')[0]
        });
        setShowMaintenanceForm(true);
    };

    const filteredAssets = assets.filter(asset => {
        const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            asset.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || asset.status === filterStatus;
        const matchesDepartment = filterDepartment === 'All' || asset.department === filterDepartment;
        return matchesSearch && matchesStatus && matchesDepartment;
    });

    const statusOptions = ['Available', 'In Use', 'Under Repair', 'Out of Service'];
    const departmentOptions = ['ICU', 'Emergency', 'General Ward', 'OR', 'Pediatrics', 'Cardiology', 'Radiology'];
    const priorityOptions = ['Low', 'Medium', 'High', 'Critical'];
    const maintenanceTypes = ['Routine', 'Repair', 'Calibration', 'Software Update', 'Inspection'];
    const technicianList = ['John Smith', 'Maria Garcia', 'David Kim', 'Sarah Johnson', 'Robert Chen'];

    return (
        <div className="assets-container">
            <header className="assets-header">
                <h2>Hospital Assets Management System</h2>
                <p>Track and manage all hospital assets and equipment</p>
            </header>

            <div className="assets-controls">
                <div className="search-filters">
                    <input
                        type="text"
                        placeholder="Search assets by name, model or serial number..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <div className="filter-group">
                        <select 
                            value={filterStatus} 
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="filter-select"
                        >
                            <option value="All">All Statuses</option>
                            {statusOptions.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                        <select 
                            value={filterDepartment} 
                            onChange={(e) => setFilterDepartment(e.target.value)}
                            className="filter-select"
                        >
                            <option value="All">All Departments</option>
                            {departmentOptions.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="assets-content">
                <div className="asset-form-section">
                    <h3>{editingId ? 'Edit Asset' : 'Add New Asset'}</h3>
                    <form onSubmit={handleSubmit} className="asset-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Asset Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter asset name"
                                    value={newAsset.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Model</label>
                                <input
                                    type="text"
                                    name="model"
                                    placeholder="Enter model"
                                    value={newAsset.model}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Serial Number</label>
                                <input
                                    type="text"
                                    name="serialNumber"
                                    placeholder="Enter serial number"
                                    value={newAsset.serialNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Department</label>
                                <select
                                    name="department"
                                    value={newAsset.department}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Department</option>
                                    {departmentOptions.map(dept => (
                                        <option key={dept} value={dept}>{dept}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Total Quantity</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    placeholder="Total quantity"
                                    value={newAsset.quantity}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                />
                            </div>
                            <div className="form-group">
                                <label>Available</label>
                                <input
                                    type="number"
                                    name="available"
                                    placeholder="Available quantity"
                                    value={newAsset.available}
                                    onChange={handleChange}
                                    min="0"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>In Use</label>
                                <input
                                    type="number"
                                    name="inUse"
                                    placeholder="In use quantity"
                                    value={newAsset.inUse}
                                    onChange={handleChange}
                                    min="0"
                                />
                            </div>
                            <div className="form-group">
                                <label>Under Repair</label>
                                <input
                                    type="number"
                                    name="underRepair"
                                    placeholder="Under repair quantity"
                                    value={newAsset.underRepair}
                                    onChange={handleChange}
                                    min="0"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Status</label>
                                <select
                                    name="status"
                                    value={newAsset.status}
                                    onChange={handleChange}
                                    required
                                >
                                    {statusOptions.map(status => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Priority</label>
                                <select
                                    name="priority"
                                    value={newAsset.priority}
                                    onChange={handleChange}
                                    required
                                >
                                    {priorityOptions.map(priority => (
                                        <option key={priority} value={priority}>{priority}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Last Maintenance Date</label>
                                <input
                                    type="date"
                                    name="lastMaintenance"
                                    value={newAsset.lastMaintenance}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Next Maintenance Date</label>
                                <input
                                    type="date"
                                    name="nextMaintenance"
                                    value={newAsset.nextMaintenance}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="primary-btn">
                                {editingId ? 'Update Asset' : 'Add Asset'}
                            </button>
                            {editingId && (
                                <button 
                                    type="button" 
                                    className="secondary-btn"
                                    onClick={() => {
                                        setEditingId(null);
                                        setNewAsset({ 
                                            name: '',
                                            model: '',
                                            serialNumber: '',
                                            quantity: '',
                                            available: '',
                                            inUse: '',
                                            underRepair: '',
                                            department: '',
                                            lastMaintenance: '',
                                            nextMaintenance: '',
                                            status: 'Available',
                                            priority: 'Medium'
                                        });
                                    }}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="assets-list-section">
                    <div className="list-header">
                        <h3>Assets Inventory ({assets.length})</h3>
                        <div className="stats">
                            <span>Total Items: {assets.reduce((sum, asset) => sum + asset.quantity, 0)}</span>
                            <span>Available: {assets.reduce((sum, asset) => sum + asset.available, 0)}</span>
                            <span>In Use: {assets.reduce((sum, asset) => sum + asset.inUse, 0)}</span>
                        </div>
                    </div>

                    {filteredAssets.length === 0 ? (
                        <div className="empty-state">
                            <p>No assets found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="assets-list">
                            {filteredAssets.map((asset) => (
                                <div key={asset.id} className={`asset-card ${asset.status.replace(/ /g, '-').toLowerCase()} ${asset.priority.toLowerCase()}`}>
                                    <div className="card-header">
                                        <div>
                                            <strong>{asset.name}</strong>
                                            <span className="asset-model">{asset.model} | {asset.serialNumber}</span>
                                            <span className="asset-dept">{asset.department}</span>
                                        </div>
                                        <div className="asset-meta">
                                            <span className={`status-badge ${asset.status.replace(/ /g, '-').toLowerCase()}`}>
                                                {asset.status}
                                            </span>
                                            <span className={`priority-badge ${asset.priority.toLowerCase()}`}>
                                                {asset.priority}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="quantity-display">
                                            <div className="quantity-item">
                                                <span className="quantity-label">Total</span>
                                                <span className="quantity-value">{asset.quantity}</span>
                                            </div>
                                            <div className="quantity-item">
                                                <span className="quantity-label">Available</span>
                                                <span className="quantity-value available">{asset.available}</span>
                                            </div>
                                            <div className="quantity-item">
                                                <span className="quantity-label">In Use</span>
                                                <span className="quantity-value in-use">{asset.inUse}</span>
                                            </div>
                                            <div className="quantity-item">
                                                <span className="quantity-label">Repair</span>
                                                <span className="quantity-value under-repair">{asset.underRepair}</span>
                                            </div>
                                        </div>
                                        <div className="maintenance-dates">
                                            <p><strong>Last Maintenance:</strong> {asset.lastMaintenance || 'N/A'}</p>
                                            <p><strong>Next Maintenance:</strong> {asset.nextMaintenance || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="card-actions">
                                        <select
                                            value={asset.status}
                                            onChange={(e) => handleStatusChange(asset.id, e.target.value)}
                                            className="status-select"
                                        >
                                            {statusOptions.map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                        {asset.underRepair > 0 && (
                                            <button 
                                                onClick={() => startMaintenance(asset.id)}
                                                className="maintenance-btn"
                                            >
                                                Complete Repair
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => handleEdit(asset)}
                                            className="edit-btn"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(asset.id)}
                                            className="delete-btn"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {showMaintenanceForm && (
                <div className="maintenance-modal">
                    <div className="modal-content">
                        <h3>Record Maintenance for Asset #{maintenanceRecord.assetId}</h3>
                        <form onSubmit={handleMaintenanceSubmit} className="maintenance-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Maintenance Date</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={maintenanceRecord.date}
                                        onChange={handleMaintenanceChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Technician</label>
                                    <select
                                        name="technician"
                                        value={maintenanceRecord.technician}
                                        onChange={handleMaintenanceChange}
                                        required
                                    >
                                        <option value="">Select Technician</option>
                                        {technicianList.map(tech => (
                                            <option key={tech} value={tech}>{tech}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Maintenance Type</label>
                                    <select
                                        name="type"
                                        value={maintenanceRecord.type}
                                        onChange={handleMaintenanceChange}
                                        required
                                    >
                                        {maintenanceTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Parts Replaced (if any)</label>
                                    <input
                                        type="text"
                                        name="partsReplaced"
                                        placeholder="Enter parts replaced"
                                        value={maintenanceRecord.partsReplaced}
                                        onChange={handleMaintenanceChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Maintenance Notes</label>
                                <textarea
                                    name="notes"
                                    placeholder="Describe work performed, issues found, etc."
                                    value={maintenanceRecord.notes}
                                    onChange={handleMaintenanceChange}
                                    rows="3"
                                    required
                                />
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="primary-btn">
                                    Save Maintenance Record
                                </button>
                                <button 
                                    type="button" 
                                    className="secondary-btn"
                                    onClick={() => setShowMaintenanceForm(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssetsManagement;