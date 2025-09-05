    import React, { useState } from 'react';
    import { 
    FaPills, 
    FaUser, 
    FaSearch, 
    FaPlus, 
    FaHistory,
    FaCalendarAlt,
    FaUserMd,
    FaFilePrescription,
    FaBoxOpen,
    FaExclamationTriangle
    } from 'react-icons/fa';
    import { GiMedicinePills } from 'react-icons/gi';
    import '../styles/PharmacyManagement.css';

    function PharmacyManagement() {
    const [formData, setFormData] = useState({
        patientName: '',
        medicineName: '',
        quantity: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: '',
        prescribingDoctor: '',
        pharmacist: '',
        datePrescribed: new Date().toISOString().split('T')[0],
        status: 'pending'
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [prescriptions, setPrescriptions] = useState([
        {
        id: 1,
        patientName: 'John Doe',
        medicineName: 'Amoxicillin',
        quantity: '30',
        dosage: '500mg',
        frequency: 'Twice daily',
        duration: '7 days',
        prescribingDoctor: 'Dr. Smith',
        datePrescribed: '2023-06-15',
        status: 'dispensed'
        },
        {
        id: 2,
        patientName: 'Jane Smith',
        medicineName: 'Lisinopril',
        quantity: '90',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '30 days',
        prescribingDoctor: 'Dr. Johnson',
        datePrescribed: '2023-06-10',
        status: 'pending'
        },
        {
        id: 3,
        patientName: 'Robert Johnson',
        medicineName: 'Atorvastatin',
        quantity: '30',
        dosage: '20mg',
        frequency: 'Once at bedtime',
        duration: '30 days',
        prescribingDoctor: 'Dr. Williams',
        datePrescribed: '2023-06-18',
        status: 'dispensed'
        }
    ]);

    const [activeTab, setActiveTab] = useState('add');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPrescription = {
        id: prescriptions.length + 1,
        ...formData,
        datePrescribed: formData.datePrescribed || new Date().toISOString().split('T')[0]
        };
        setPrescriptions([...prescriptions, newPrescription]);
        setSuccessMessage('Prescription added successfully!');
        setFormData({ 
        patientName: '', 
        medicineName: '', 
        quantity: '', 
        dosage: '', 
        frequency: '',
        duration: '',
        instructions: '',
        prescribingDoctor: '',
        pharmacist: '',
        datePrescribed: new Date().toISOString().split('T')[0],
        status: 'pending'
        });
        
        setTimeout(() => {
        setSuccessMessage('');
        }, 3000);
    };

    const updateStatus = (id, newStatus) => {
        setPrescriptions(prescriptions.map(prescription => 
        prescription.id === id ? { ...prescription, status: newStatus } : prescription
        ));
    };

    const filteredPrescriptions = prescriptions.filter(prescription =>
        prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="pharmacy-container">
        <div className="pharmacy-header">
            <h2 className="pharmacy-title">
            <FaPills className="header-icon" />
            Pharmacy Management
            </h2>
            <p className="pharmacy-subtitle">Manage prescriptions and medication inventory</p>
        </div>

        {successMessage && (
            <div className="success-message">
            {successMessage}
            </div>
        )}

        <div className="tabs">
            <button 
            className={`tab ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
            >
            <FaPlus className="tab-icon" />
            Add Prescription
            </button>
            <button 
            className={`tab ${activeTab === 'view' ? 'active' : ''}`}
            onClick={() => setActiveTab('view')}
            >
            <FaHistory className="tab-icon" />
            View Prescriptions
            </button>
        </div>

        {activeTab === 'add' && (
            <form onSubmit={handleSubmit} className="pharmacy-form">
            <div className="form-section">
                <div className="section-header">
                <FaFilePrescription className="section-icon" />
                <h3>Prescription Information</h3>
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
                    value={formData.patientName}
                    onChange={handleChange}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <GiMedicinePills className="input-icon" />
                    Medicine Name *
                    </label>
                    <input
                    type="text"
                    name="medicineName"
                    className="form-input"
                    value={formData.medicineName}
                    onChange={handleChange}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaBoxOpen className="input-icon" />
                    Quantity *
                    </label>
                    <input
                    type="number"
                    name="quantity"
                    className="form-input"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaPills className="input-icon" />
                    Dosage *
                    </label>
                    <input
                    type="text"
                    name="dosage"
                    className="form-input"
                    value={formData.dosage}
                    onChange={handleChange}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaPills className="input-icon" />
                    Frequency *
                    </label>
                    <select
                    name="frequency"
                    className="form-input"
                    value={formData.frequency}
                    onChange={handleChange}
                    required
                    >
                    <option value="">Select Frequency</option>
                    <option value="Once daily">Once daily</option>
                    <option value="Twice daily">Twice daily</option>
                    <option value="Three times daily">Three times daily</option>
                    <option value="Four times daily">Four times daily</option>
                    <option value="Every other day">Every other day</option>
                    <option value="Weekly">Weekly</option>
                    <option value="As needed">As needed</option>
                    </select>
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaCalendarAlt className="input-icon" />
                    Duration *
                    </label>
                    <input
                    type="text"
                    name="duration"
                    className="form-input"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g., 7 days, 1 month"
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaExclamationTriangle className="input-icon" />
                    Special Instructions
                    </label>
                    <textarea
                    name="instructions"
                    className="form-input"
                    rows="3"
                    value={formData.instructions}
                    onChange={handleChange}
                    placeholder="Any special instructions"
                    ></textarea>
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaUserMd className="input-icon" />
                    Prescribing Doctor *
                    </label>
                    <input
                    type="text"
                    name="prescribingDoctor"
                    className="form-input"
                    value={formData.prescribingDoctor}
                    onChange={handleChange}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaUser className="input-icon" />
                    Pharmacist Name *
                    </label>
                    <input
                    type="text"
                    name="pharmacist"
                    className="form-input"
                    value={formData.pharmacist}
                    onChange={handleChange}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaCalendarAlt className="input-icon" />
                    Date Prescribed *
                    </label>
                    <input
                    type="date"
                    name="datePrescribed"
                    className="form-input"
                    value={formData.datePrescribed}
                    onChange={handleChange}
                    required
                    />
                </div>
                </div>
            </div>
            
            <div className="form-actions">
                <button
                type="submit"
                className="primary-button"
                >
                Add Prescription
                </button>
            </div>
            </form>
        )}

        {activeTab === 'view' && (
            <div className="prescriptions-container">
            <div className="search-container">
                <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search prescriptions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                </div>
            </div>
            
            {filteredPrescriptions.length > 0 ? (
                <div className="prescriptions-list">
                {filteredPrescriptions.map(prescription => (
                    <div key={prescription.id} className="prescription-card">
                    <div className="prescription-header">
                        <div className="patient-info">
                        <h4>
                            <FaUser className="info-icon" />
                            {prescription.patientName}
                        </h4>
                        <p>
                            <FaUserMd className="info-icon" />
                            Prescribed by: {prescription.prescribingDoctor}
                        </p>
                        </div>
                        <div className="prescription-date">
                        <FaCalendarAlt className="info-icon" />
                        {prescription.datePrescribed}
                        </div>
                    </div>
                    
                    <div className="prescription-details">
                        <div className="medicine-info">
                        <h5>
                            <GiMedicinePills className="detail-icon" />
                            {prescription.medicineName}
                        </h5>
                        <p><strong>Dosage:</strong> {prescription.dosage}</p>
                        <p><strong>Quantity:</strong> {prescription.quantity}</p>
                        <p><strong>Frequency:</strong> {prescription.frequency}</p>
                        <p><strong>Duration:</strong> {prescription.duration}</p>
                        </div>
                        
                        <div className="prescription-status">
                        <span className={`status-badge ${prescription.status}`}>
                            {prescription.status}
                        </span>
                        {prescription.status === 'pending' && (
                            <button 
                            className="status-button"
                            onClick={() => updateStatus(prescription.id, 'dispensed')}
                            >
                            Mark as Dispensed
                            </button>
                        )}
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            ) : (
                <div className="no-prescriptions">
                No prescriptions found
                </div>
            )}
            </div>
        )}
        </div>
    );
    }

    export default PharmacyManagement;