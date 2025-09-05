    import React, { useState } from 'react';
    import { 
    FaAmbulance, 
    FaUser, 
    FaMapMarkerAlt, 
    FaHospital, 
    FaCar, 
    FaUserTie,
    FaSearch,
    FaPlus,
    FaHistory,
    FaPhone,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaEdit,
    FaTrash
    } from 'react-icons/fa';
    import '../styles/AmbulanceManagement.css';

    function AmbulanceManagement() {
    const [ambulanceData, setAmbulanceData] = useState({
        requestId: `AMB-${Math.floor(Math.random() * 10000)}`,
        patientName: '',
        patientContact: '',
        pickupLocation: '',
        destination: '',
        ambulanceNumber: '',
        driverName: '',
        driverContact: '',
        emergencyType: 'Non-Emergency',
        status: 'Pending',
        requestTime: new Date().toISOString().split('T')[0],
        notes: ''
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('request');
    const [requests, setRequests] = useState([
        {
        id: 1,
        requestId: 'AMB-1001',
        patientName: 'John Doe',
        patientContact: '555-0101',
        pickupLocation: '123 Main St, Cityville',
        destination: 'City General Hospital',
        ambulanceNumber: 'AMB-789',
        driverName: 'Mike Johnson',
        driverContact: '555-7890',
        emergencyType: 'Emergency',
        status: 'Completed',
        requestTime: '2023-06-15',
        completionTime: '2023-06-15'
        },
        {
        id: 2,
        requestId: 'AMB-1002',
        patientName: 'Jane Smith',
        patientContact: '555-0202',
        pickupLocation: '456 Oak Ave, Townsville',
        destination: 'Regional Medical Center',
        ambulanceNumber: 'AMB-456',
        driverName: 'Sarah Williams',
        driverContact: '555-4567',
        emergencyType: 'Emergency',
        status: 'On the way',
        requestTime: '2023-06-16'
        },
        {
        id: 3,
        requestId: 'AMB-1003',
        patientName: 'Robert Brown',
        patientContact: '555-0303',
        pickupLocation: '789 Pine Rd, Villagetown',
        destination: 'University Hospital',
        ambulanceNumber: 'AMB-123',
        driverName: 'David Lee',
        driverContact: '555-1234',
        emergencyType: 'Non-Emergency',
        status: 'Pending',
        requestTime: '2023-06-17'
        }
    ]);

    const handleChange = (e) => {
        setAmbulanceData({ ...ambulanceData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newRequest = {
        id: requests.length + 1,
        ...ambulanceData,
        requestTime: new Date().toISOString().split('T')[0]
        };
        setRequests([...requests, newRequest]);
        alert('Ambulance request submitted successfully!');
        setAmbulanceData({
        requestId: `AMB-${Math.floor(Math.random() * 10000)}`,
        patientName: '',
        patientContact: '',
        pickupLocation: '',
        destination: '',
        ambulanceNumber: '',
        driverName: '',
        driverContact: '',
        emergencyType: 'Non-Emergency',
        status: 'Pending',
        requestTime: new Date().toISOString().split('T')[0],
        notes: ''
        });
    };

    const updateStatus = (id, newStatus) => {
        const updatedRequests = requests.map(request => {
        if (request.id === id) {
            return { 
            ...request, 
            status: newStatus,
            ...(newStatus === 'Completed' && { completionTime: new Date().toISOString().split('T')[0] })
            };
        }
        return request;
        });
        setRequests(updatedRequests);
    };

    const deleteRequest = (id) => {
        setRequests(requests.filter(request => request.id !== id));
    };

    const filteredRequests = requests.filter(request =>
        request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.requestId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.ambulanceNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="ambulance-container">
        <div className="ambulance-header">
            <h2 className="ambulance-title">
            <FaAmbulance className="header-icon" />
            Ambulance Management
            </h2>
            <p className="ambulance-subtitle">Coordinate and track ambulance services</p>
        </div>

        <div className="tabs">
            <button 
            className={`tab ${activeTab === 'request' ? 'active' : ''}`}
            onClick={() => setActiveTab('request')}
            >
            <FaPlus className="tab-icon" />
            New Request
            </button>
            <button 
            className={`tab ${activeTab === 'track' ? 'active' : ''}`}
            onClick={() => setActiveTab('track')}
            >
            <FaHistory className="tab-icon" />
            Track Requests
            </button>
        </div>

        {activeTab === 'request' && (
            <form onSubmit={handleSubmit} className="ambulance-form">
            <div className="form-section">
                <div className="section-header">
                <FaAmbulance className="section-icon" />
                <h3>Ambulance Request Form</h3>
                </div>
                
                <div className="form-grid">
                <div className="form-group">
                    <label className="form-label">
                    <FaUser className="input-icon" />
                    Patient Name *
                    </label>
                    <input
                    type="text"
                    name="patientName"
                    className="form-input"
                    value={ambulanceData.patientName}
                    onChange={handleChange}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaPhone className="input-icon" />
                    Patient Contact *
                    </label>
                    <input
                    type="tel"
                    name="patientContact"
                    className="form-input"
                    value={ambulanceData.patientContact}
                    onChange={handleChange}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaMapMarkerAlt className="input-icon" />
                    Pickup Location *
                    </label>
                    <input
                    type="text"
                    name="pickupLocation"
                    className="form-input"
                    value={ambulanceData.pickupLocation}
                    onChange={handleChange}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaHospital className="input-icon" />
                    Destination *
                    </label>
                    <input
                    type="text"
                    name="destination"
                    className="form-input"
                    value={ambulanceData.destination}
                    onChange={handleChange}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaCar className="input-icon" />
                    Ambulance Number *
                    </label>
                    <input
                    type="text"
                    name="ambulanceNumber"
                    className="form-input"
                    value={ambulanceData.ambulanceNumber}
                    onChange={handleChange}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaUserTie className="input-icon" />
                    Driver Name *
                    </label>
                    <input
                    type="text"
                    name="driverName"
                    className="form-input"
                    value={ambulanceData.driverName}
                    onChange={handleChange}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaPhone className="input-icon" />
                    Driver Contact *
                    </label>
                    <input
                    type="tel"
                    name="driverContact"
                    className="form-input"
                    value={ambulanceData.driverContact}
                    onChange={handleChange}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaAmbulance className="input-icon" />
                    Emergency Type *
                    </label>
                    <select
                    name="emergencyType"
                    className="form-input"
                    value={ambulanceData.emergencyType}
                    onChange={handleChange}
                    required
                    >
                    <option value="Emergency">Emergency</option>
                    <option value="Non-Emergency">Non-Emergency</option>
                    <option value="Critical">Critical</option>
                    </select>
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaClock className="input-icon" />
                    Request Time *
                    </label>
                    <input
                    type="datetime-local"
                    name="requestTime"
                    className="form-input"
                    value={ambulanceData.requestTime}
                    onChange={handleChange}
                    required
                    />
                </div>
                
                <div className="form-group full-width">
                    <label className="form-label">
                    Additional Notes
                    </label>
                    <textarea
                    name="notes"
                    className="form-input"
                    rows="3"
                    value={ambulanceData.notes}
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
                Submit Ambulance Request
                </button>
            </div>
            </form>
        )}

        {activeTab === 'track' && (
            <div className="tracking-container">
            <div className="search-container">
                <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                </div>
            </div>
            
            {filteredRequests.length > 0 ? (
                <div className="requests-list">
                {filteredRequests.map(request => (
                    <div key={request.id} className={`request-card ${request.emergencyType.toLowerCase()}`}>
                    <div className="request-header">
                        <div className="request-id">
                        <span>#{request.requestId}</span>
                        <span className={`emergency-tag ${request.emergencyType.toLowerCase()}`}>
                            {request.emergencyType}
                        </span>
                        </div>
                        <div className="request-time">
                        <FaClock className="time-icon" />
                        {request.requestTime}
                        {request.completionTime && (
                            <>
                            <span className="time-separator">to</span>
                            {request.completionTime}
                            </>
                        )}
                        </div>
                    </div>
                    
                    <div className="request-details">
                        <div className="patient-info">
                        <h4>
                            <FaUser className="info-icon" />
                            {request.patientName}
                        </h4>
                        <p>
                            <FaPhone className="info-icon" />
                            {request.patientContact}
                        </p>
                        </div>
                        
                        <div className="route-info">
                        <div className="location">
                            <FaMapMarkerAlt className="location-icon" />
                            <span>{request.pickupLocation}</span>
                        </div>
                        <div className="arrow">→</div>
                        <div className="location">
                            <FaHospital className="location-icon" />
                            <span>{request.destination}</span>
                        </div>
                        </div>
                        
                        <div className="ambulance-info">
                        <p>
                            <FaCar className="info-icon" />
                            Ambulance: {request.ambulanceNumber}
                        </p>
                        <p>
                            <FaUserTie className="info-icon" />
                            Driver: {request.driverName} ({request.driverContact})
                        </p>
                        </div>
                    </div>
                    
                    <div className="request-footer">
                        <div className={`status-badge ${request.status.toLowerCase().replace(' ', '-')}`}>
                        {request.status}
                        </div>
                        
                        <div className="request-actions">
                        {request.status !== 'Completed' && (
                            <>
                            <button 
                                className="action-button update-button"
                                onClick={() => {
                                const newStatus = prompt('Update status:', request.status);
                                if (newStatus) updateStatus(request.id, newStatus);
                                }}
                            >
                                <FaEdit /> Update
                            </button>
                            <button 
                                className="action-button complete-button"
                                onClick={() => updateStatus(request.id, 'Completed')}
                            >
                                <FaCheckCircle /> Complete
                            </button>
                            </>
                        )}
                        <button 
                            className="action-button cancel-button"
                            onClick={() => {
                            if (window.confirm('Are you sure you want to cancel this request?')) {
                                deleteRequest(request.id);
                            }
                            }}
                        >
                            <FaTimesCircle /> Cancel
                        </button>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            ) : (
                <div className="no-requests">
                No ambulance requests found
                </div>
            )}
            </div>
        )}
        </div>
    );
    }

    export default AmbulanceManagement;