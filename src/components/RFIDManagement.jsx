    import React, { useState } from 'react';
    import { 
    FaFingerprint, 
    FaUser, 
    FaSearch, 
    FaPlus, 
    FaHistory,
    FaCalendarAlt,
    FaUserShield,
    FaIdCard,
    FaQrcode,
    FaTrash,
    FaEdit
    } from 'react-icons/fa';
    import '../styles/RFIDManagement.css';

    function RFIDManagement() {
    const [rfidData, setRfidData] = useState({
        patientId: '',
        patientName: '',
        rfidTag: '',
        assignedBy: '',
        issueDate: new Date().toISOString().split('T')[0],
        status: 'active'
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [rfidAssignments, setRfidAssignments] = useState([
        {
        id: 1,
        patientId: 'PAT-1001',
        patientName: 'John Doe',
        rfidTag: 'RFID-987654',
        assignedBy: 'Dr. Smith',
        issueDate: '2023-06-15',
        status: 'active'
        },
        {
        id: 2,
        patientId: 'PAT-1002',
        patientName: 'Jane Smith',
        rfidTag: 'RFID-123456',
        assignedBy: 'Nurse Johnson',
        issueDate: '2023-06-10',
        status: 'inactive'
        },
        {
        id: 3,
        patientId: 'PAT-1003',
        patientName: 'Robert Johnson',
        rfidTag: 'RFID-456789',
        assignedBy: 'Admin Williams',
        issueDate: '2023-06-18',
        status: 'active'
        }
    ]);

    const [activeTab, setActiveTab] = useState('assign');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setRfidData({ ...rfidData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAssignment = {
        id: rfidAssignments.length + 1,
        ...rfidData,
        issueDate: rfidData.issueDate || new Date().toISOString().split('T')[0]
        };
        setRfidAssignments([...rfidAssignments, newAssignment]);
        setSuccessMessage('RFID Tag assigned successfully!');
        setRfidData({ 
        patientId: '',
        patientName: '',
        rfidTag: '',
        assignedBy: '',
        issueDate: new Date().toISOString().split('T')[0],
        status: 'active'
        });
        
        setTimeout(() => {
        setSuccessMessage('');
        }, 3000);
    };

    const updateStatus = (id, newStatus) => {
        setRfidAssignments(rfidAssignments.map(assignment => 
        assignment.id === id ? { ...assignment, status: newStatus } : assignment
        ));
    };

    const deleteAssignment = (id) => {
        setRfidAssignments(rfidAssignments.filter(assignment => assignment.id !== id));
    };

    const filteredAssignments = rfidAssignments.filter(assignment =>
        assignment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.rfidTag.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.patientId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="rfid-container">
        <div className="rfid-header">
            <h2 className="rfid-title">
            <FaFingerprint className="header-icon" />
            RFID Management
            </h2>
            <p className="rfid-subtitle">Manage patient RFID tag assignments</p>
        </div>

        {successMessage && (
            <div className="success-message">
            {successMessage}
            </div>
        )}

        <div className="tabs">
            <button 
            className={`tab ${activeTab === 'assign' ? 'active' : ''}`}
            onClick={() => setActiveTab('assign')}
            >
            <FaPlus className="tab-icon" />
            Assign RFID
            </button>
            <button 
            className={`tab ${activeTab === 'view' ? 'active' : ''}`}
            onClick={() => setActiveTab('view')}
            >
            <FaHistory className="tab-icon" />
            View Assignments
            </button>
        </div>

        {activeTab === 'assign' && (
            <form onSubmit={handleSubmit} className="rfid-form">
            <div className="form-section">
                <div className="section-header">
                <FaFingerprint className="section-icon" />
                <h3>RFID Assignment Form</h3>
                </div>
                
                <div className="form-grid">
                <div className="form-group">
                    <label className="form-label">
                    <FaIdCard className="input-icon" />
                    Patient ID *
                    </label>
                    <input
                    type="text"
                    name="patientId"
                    className="form-input"
                    value={rfidData.patientId}
                    onChange={handleChange}
                    required
                    placeholder="Enter patient ID"
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaUser className="input-icon" />
                    Patient Name *
                    </label>
                    <input
                    type="text"
                    name="patientName"
                    className="form-input"
                    value={rfidData.patientName}
                    onChange={handleChange}
                    required
                    placeholder="Enter patient name"
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaQrcode className="input-icon" />
                    RFID Tag Number *
                    </label>
                    <input
                    type="text"
                    name="rfidTag"
                    className="form-input"
                    value={rfidData.rfidTag}
                    onChange={handleChange}
                    required
                    placeholder="Enter RFID tag number"
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaUserShield className="input-icon" />
                    Assigned By *
                    </label>
                    <input
                    type="text"
                    name="assignedBy"
                    className="form-input"
                    value={rfidData.assignedBy}
                    onChange={handleChange}
                    required
                    placeholder="Enter assigner name"
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaCalendarAlt className="input-icon" />
                    Issue Date *
                    </label>
                    <input
                    type="date"
                    name="issueDate"
                    className="form-input"
                    value={rfidData.issueDate}
                    onChange={handleChange}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaFingerprint className="input-icon" />
                    Status *
                    </label>
                    <select
                    name="status"
                    className="form-input"
                    value={rfidData.status}
                    onChange={handleChange}
                    required
                    >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    </select>
                </div>
                </div>
            </div>
            
            <div className="form-actions">
                <button
                type="submit"
                className="primary-button"
                >
                Assign RFID Tag
                </button>
            </div>
            </form>
        )}

        {activeTab === 'view' && (
            <div className="assignments-container">
            <div className="search-container">
                <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search assignments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                </div>
            </div>
            
            {filteredAssignments.length > 0 ? (
                <div className="assignments-list">
                {filteredAssignments.map(assignment => (
                    <div key={assignment.id} className="assignment-card">
                    <div className="assignment-header">
                        <div className="patient-info">
                        <h4>
                            <FaUser className="info-icon" />
                            {assignment.patientName}
                        </h4>
                        <p>
                            <FaIdCard className="info-icon" />
                            Patient ID: {assignment.patientId}
                        </p>
                        </div>
                        <div className="assignment-date">
                        <FaCalendarAlt className="info-icon" />
                        {assignment.issueDate}
                        </div>
                    </div>
                    
                    <div className="assignment-details">
                        <div className="rfid-info">
                        <h5>
                            <FaFingerprint className="detail-icon" />
                            RFID Tag: {assignment.rfidTag}
                        </h5>
                        <p><strong>Assigned By:</strong> {assignment.assignedBy}</p>
                        </div>
                        
                        <div className="assignment-status">
                        <span className={`status-badge ${assignment.status}`}>
                            {assignment.status}
                        </span>
                        <div className="assignment-actions">
                            {assignment.status === 'active' ? (
                            <button 
                                className="status-button"
                                onClick={() => updateStatus(assignment.id, 'inactive')}
                            >
                                Deactivate
                            </button>
                            ) : (
                            <button 
                                className="status-button"
                                onClick={() => updateStatus(assignment.id, 'active')}
                            >
                                Activate
                            </button>
                            )}
                            <button 
                            className="edit-button"
                            onClick={() => console.log('Edit:', assignment.id)}
                            >
                            <FaEdit /> Edit
                            </button>
                            <button 
                            className="delete-button"
                            onClick={() => deleteAssignment(assignment.id)}
                            >
                            <FaTrash /> Delete
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            ) : (
                <div className="no-assignments">
                No RFID assignments found
                </div>
            )}
            </div>
        )}
        </div>
    );
    }

    export default RFIDManagement;