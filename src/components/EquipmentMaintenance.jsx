import React, { useState } from 'react';
import '../styles/EquipmentMaintenance.css';

const EquipmentMaintenance = () => {
    const [equipments, setEquipments] = useState([
        { 
            id: 1, 
            name: 'ECG Machine', 
            model: 'CardioMax 3000', 
            serialNumber: 'ECG-2023-001', 
            status: 'Operational', 
            lastMaintenance: '2025-03-15',
            nextMaintenance: '2025-09-15',
            department: 'Cardiology',
            maintenanceNotes: 'Routine calibration performed',
            priority: 'Medium'
        },
        { 
            id: 2, 
            name: 'X-Ray Machine', 
            model: 'RadView Pro', 
            serialNumber: 'XR-2022-045', 
            status: 'Under Maintenance', 
            lastMaintenance: '2025-04-05',
            nextMaintenance: '2025-10-05',
            department: 'Radiology',
            maintenanceNotes: 'Replacing cooling system',
            priority: 'High'
        },
        { 
            id: 3, 
            name: 'Ventilator', 
            model: 'BreathEase V5', 
            serialNumber: 'VEN-2024-012', 
            status: 'Operational', 
            lastMaintenance: '2025-02-28',
            nextMaintenance: '2025-08-28',
            department: 'ICU',
            maintenanceNotes: 'Software updated to v2.1.3',
            priority: 'High'
        },
    ]);

    const [newEquipment, setNewEquipment] = useState({
        name: '',
        model: '',
        serialNumber: '',
        status: 'Operational',
        lastMaintenance: '',
        nextMaintenance: '',
        department: '',
        maintenanceNotes: '',
        priority: 'Medium'
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterDepartment, setFilterDepartment] = useState('All');
    const [editingId, setEditingId] = useState(null);
    const [showMaintenanceForm, setShowMaintenanceForm] = useState(false);
    const [maintenanceRecord, setMaintenanceRecord] = useState({
        equipmentId: null,
        date: '',
        technician: '',
        type: 'Routine',
        notes: '',
        partsReplaced: ''
    });

    const handleChange = (e) => {
        setNewEquipment({
            ...newEquipment,
            [e.target.name]: e.target.value
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
        if (editingId) {
            setEquipments(equipments.map(eq => 
                eq.id === editingId ? { ...newEquipment, id: editingId } : eq
            ));
            setEditingId(null);
        } else {
            setEquipments([...equipments, { 
                id: equipments.length > 0 ? Math.max(...equipments.map(e => e.id)) + 1 : 1, 
                ...newEquipment 
            }]);
        }
        setNewEquipment({ 
            name: '',
            model: '',
            serialNumber: '',
            status: 'Operational',
            lastMaintenance: '',
            nextMaintenance: '',
            department: '',
            maintenanceNotes: '',
            priority: 'Medium'
        });
    };

    const handleMaintenanceSubmit = (e) => {
        e.preventDefault();
        const updatedEquipments = equipments.map(eq => {
            if (eq.id === maintenanceRecord.equipmentId) {
                return {
                    ...eq,
                    status: 'Operational',
                    lastMaintenance: maintenanceRecord.date,
                    nextMaintenance: calculateNextMaintenanceDate(maintenanceRecord.date, 6), // 6 months later
                    maintenanceNotes: maintenanceRecord.notes
                };
            }
            return eq;
        });
        
        setEquipments(updatedEquipments);
        setShowMaintenanceForm(false);
        setMaintenanceRecord({
            equipmentId: null,
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

    const handleEdit = (equipment) => {
        setNewEquipment(equipment);
        setEditingId(equipment.id);
    };

    const handleDelete = (id) => {
        setEquipments(equipments.filter(eq => eq.id !== id));
    };

    const handleStatusChange = (id, newStatus) => {
        setEquipments(equipments.map(eq => 
            eq.id === id ? { ...eq, status: newStatus } : eq
        ));
    };

    const startMaintenance = (id) => {
        setMaintenanceRecord({
            ...maintenanceRecord,
            equipmentId: id,
            date: new Date().toISOString().split('T')[0]
        });
        setShowMaintenanceForm(true);
    };

    const filteredEquipments = equipments.filter(equipment => {
        const matchesSearch = equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            equipment.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            equipment.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || equipment.status === filterStatus;
        const matchesDepartment = filterDepartment === 'All' || equipment.department === filterDepartment;
        return matchesSearch && matchesStatus && matchesDepartment;
    });

    const statusOptions = ['Operational', 'Under Maintenance', 'Out of Service', 'Needs Calibration'];
    const departmentOptions = ['ICU', 'Cardiology', 'Radiology', 'ER', 'OR', 'Pediatrics', 'Neurology'];
    const priorityOptions = ['Low', 'Medium', 'High', 'Critical'];
    const maintenanceTypes = ['Routine', 'Repair', 'Calibration', 'Software Update', 'Inspection'];
    const technicianList = ['John Smith', 'Maria Garcia', 'David Kim', 'Sarah Johnson', 'Robert Chen'];

    return (
        <div className="equip-container">
            <header className="equip-header">
                <h2>Medical Equipment Maintenance System</h2>
                <p>Track and manage all hospital equipment maintenance</p>
            </header>

            <div className="equip-controls">
                <div className="search-filters">
                    <input
                        type="text"
                        placeholder="Search equipment by name, model or serial number..."
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

            <div className="equip-content">
                <div className="equip-form-section">
                    <h3>{editingId ? 'Edit Equipment' : 'Add New Equipment'}</h3>
                    <form onSubmit={handleSubmit} className="equip-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Equipment Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter equipment name"
                                    value={newEquipment.name}
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
                                    value={newEquipment.model}
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
                                    value={newEquipment.serialNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Department</label>
                                <select
                                    name="department"
                                    value={newEquipment.department}
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
                                <label>Status</label>
                                <select
                                    name="status"
                                    value={newEquipment.status}
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
                                    value={newEquipment.priority}
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
                                    value={newEquipment.lastMaintenance}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Next Maintenance Date</label>
                                <input
                                    type="date"
                                    name="nextMaintenance"
                                    value={newEquipment.nextMaintenance}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Maintenance Notes</label>
                            <textarea
                                name="maintenanceNotes"
                                placeholder="Enter any maintenance notes or issues"
                                value={newEquipment.maintenanceNotes}
                                onChange={handleChange}
                                rows="3"
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="primary-btn">
                                {editingId ? 'Update Equipment' : 'Add Equipment'}
                            </button>
                            {editingId && (
                                <button 
                                    type="button" 
                                    className="secondary-btn"
                                    onClick={() => {
                                        setEditingId(null);
                                        setNewEquipment({ 
                                            name: '',
                                            model: '',
                                            serialNumber: '',
                                            status: 'Operational',
                                            lastMaintenance: '',
                                            nextMaintenance: '',
                                            department: '',
                                            maintenanceNotes: '',
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

                <div className="equip-list-section">
                    <div className="list-header">
                        <h3>Equipment Inventory ({equipments.length})</h3>
                        <div className="stats">
                            <span>Operational: {equipments.filter(e => e.status === 'Operational').length}</span>
                            <span>Maintenance: {equipments.filter(e => e.status === 'Under Maintenance').length}</span>
                            <span>Out of Service: {equipments.filter(e => e.status === 'Out of Service').length}</span>
                        </div>
                    </div>

                    {filteredEquipments.length === 0 ? (
                        <div className="empty-state">
                            <p>No equipment found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="equip-list">
                            {filteredEquipments.map((equipment) => (
                                <div key={equipment.id} className={`equip-card ${equipment.status.replace(/ /g, '-').toLowerCase()} ${equipment.priority.toLowerCase()}`}>
                                    <div className="card-header">
                                        <div>
                                            <strong>{equipment.name}</strong>
                                            <span className="equip-model">{equipment.model} | {equipment.serialNumber}</span>
                                            <span className="equip-dept">{equipment.department}</span>
                                        </div>
                                        <div className="equip-meta">
                                            <span className={`status-badge ${equipment.status.replace(/ /g, '-').toLowerCase()}`}>
                                                {equipment.status}
                                            </span>
                                            <span className={`priority-badge ${equipment.priority.toLowerCase()}`}>
                                                {equipment.priority}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="equip-details">
                                            <div className="maintenance-dates">
                                                <p><strong>Last Maintenance:</strong> {equipment.lastMaintenance || 'N/A'}</p>
                                                <p><strong>Next Maintenance:</strong> {equipment.nextMaintenance || 'N/A'}</p>
                                            </div>
                                            {equipment.maintenanceNotes && (
                                                <p className="notes"><strong>Notes:</strong> {equipment.maintenanceNotes}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="card-actions">
                                        <select
                                            value={equipment.status}
                                            onChange={(e) => handleStatusChange(equipment.id, e.target.value)}
                                            className="status-select"
                                        >
                                            {statusOptions.map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                        {equipment.status !== 'Under Maintenance' && (
                                            <button 
                                                onClick={() => startMaintenance(equipment.id)}
                                                className="maintenance-btn"
                                            >
                                                Record Maintenance
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => handleEdit(equipment)}
                                            className="edit-btn"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(equipment.id)}
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
                        <h3>Record Maintenance for Equipment #{maintenanceRecord.equipmentId}</h3>
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

export default EquipmentMaintenance;