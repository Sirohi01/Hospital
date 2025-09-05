    import React, { useState } from 'react';
    import { 
    FaUserPlus, 
    FaIdCard, 
    FaPhone, 
    FaEnvelope, 
    FaMapMarkerAlt, 
    FaBirthdayCake,
    FaNotesMedical,
    FaFileMedical,
    FaUserShield,
    FaClinicMedical
    } from 'react-icons/fa';
    import { GiHealthNormal } from 'react-icons/gi';
    import '../styles/PatientRegistration.css';

    function PatientRegistration() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        contactNumber: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        bloodGroup: '',
        allergies: '',
        medicalHistory: '',
        currentMedications: '',
        primaryPhysician: '',
        emergencyContactName: '',
        emergencyContactNumber: '',
        insuranceProvider: '',
        insuranceNumber: '',
        policyStartDate: '',
        policyEndDate: ''
    });

    const [activeTab, setActiveTab] = useState('personal');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Patient Registered:', formData);
        setSuccessMessage('Patient registration successful!');
        
        // Reset form after 3 seconds
        setTimeout(() => {
        setFormData({
            firstName: '',
            lastName: '',
            dob: '',
            gender: '',
            contactNumber: '',
            email: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            bloodGroup: '',
            allergies: '',
            medicalHistory: '',
            currentMedications: '',
            primaryPhysician: '',
            emergencyContactName: '',
            emergencyContactNumber: '',
            insuranceProvider: '',
            insuranceNumber: '',
            policyStartDate: '',
            policyEndDate: ''
        });
        setSuccessMessage('');
        }, 3000);
    };

    return (
        <div className="registration-container">
        <div className="registration-header">
            <h2 className="registration-title">
            <FaUserPlus className="header-icon" />
            Patient Registration
            </h2>
            <p className="registration-subtitle">Complete all sections to register a new patient</p>
        </div>

        {successMessage && (
            <div className="success-message">
            {successMessage}
            </div>
        )}

        <div className="tabs">
            <button 
            className={`tab ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
            >
            <FaUserPlus className="tab-icon" />
            Personal Info
            </button>
            <button 
            className={`tab ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
            >
            <FaPhone className="tab-icon" />
            Contact Info
            </button>
            <button 
            className={`tab ${activeTab === 'medical' ? 'active' : ''}`}
            onClick={() => setActiveTab('medical')}
            >
            <FaNotesMedical className="tab-icon" />
            Medical Info
            </button>
            <button 
            className={`tab ${activeTab === 'insurance' ? 'active' : ''}`}
            onClick={() => setActiveTab('insurance')}
            >
            <FaUserShield className="tab-icon" />
            Insurance Info
            </button>
        </div>

        <form onSubmit={handleSubmit} className="registration-form">
            {(activeTab === 'personal' || activeTab === 'all') && (
            <div className="form-section">
                <div className="section-header">
                <GiHealthNormal className="section-icon" />
                <h3>Personal Information</h3>
                </div>
                
                <div className="form-grid">
                <div className="form-group">
                    <label className="form-label">
                    <FaUserPlus className="input-icon" />
                    First Name *
                    </label>
                    <input
                    type="text"
                    name="firstName"
                    className="form-input"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaUserPlus className="input-icon" />
                    Last Name *
                    </label>
                    <input
                    type="text"
                    name="lastName"
                    className="form-input"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaBirthdayCake className="input-icon" />
                    Date of Birth *
                    </label>
                    <input
                    type="date"
                    name="dob"
                    className="form-input"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaUserPlus className="input-icon" />
                    Gender *
                    </label>
                    <select
                    name="gender"
                    className="form-input"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                </div>
                </div>
            </div>
            )}
            
            {(activeTab === 'contact' || activeTab === 'all') && (
            <div className="form-section">
                <div className="section-header">
                <FaMapMarkerAlt className="section-icon" />
                <h3>Contact Information</h3>
                </div>
                
                <div className="form-grid">
                <div className="form-group">
                    <label className="form-label">
                    <FaPhone className="input-icon" />
                    Contact Number *
                    </label>
                    <input
                    type="tel"
                    name="contactNumber"
                    className="form-input"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaEnvelope className="input-icon" />
                    Email
                    </label>
                    <input
                    type="email"
                    name="email"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                    />
                </div>
                
                <div className="form-group full-width">
                    <label className="form-label">
                    <FaMapMarkerAlt className="input-icon" />
                    Address
                    </label>
                    <input
                    type="text"
                    name="address"
                    className="form-input"
                    value={formData.address}
                    onChange={handleChange}
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">City</label>
                    <input
                    type="text"
                    name="city"
                    className="form-input"
                    value={formData.city}
                    onChange={handleChange}
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">State</label>
                    <input
                    type="text"
                    name="state"
                    className="form-input"
                    value={formData.state}
                    onChange={handleChange}
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">ZIP Code</label>
                    <input
                    type="text"
                    name="zipCode"
                    className="form-input"
                    value={formData.zipCode}
                    onChange={handleChange}
                    />
                </div>
                </div>
            </div>
            )}
            
            {(activeTab === 'medical' || activeTab === 'all') && (
            <div className="form-section">
                <div className="section-header">
                <FaNotesMedical className="section-icon" />
                <h3>Medical Information</h3>
                </div>
                
                <div className="form-grid">
                <div className="form-group">
                    <label className="form-label">
                    <FaClinicMedical className="input-icon" />
                    Blood Group
                    </label>
                    <select
                    name="bloodGroup"
                    className="form-input"
                    value={formData.bloodGroup}
                    onChange={handleChange}
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
                    <FaClinicMedical className="input-icon" />
                    Allergies
                    </label>
                    <input
                    type="text"
                    name="allergies"
                    className="form-input"
                    value={formData.allergies}
                    onChange={handleChange}
                    placeholder="List any allergies"
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaFileMedical className="input-icon" />
                    Current Medications
                    </label>
                    <input
                    type="text"
                    name="currentMedications"
                    className="form-input"
                    value={formData.currentMedications}
                    onChange={handleChange}
                    placeholder="Current medications"
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaUserPlus className="input-icon" />
                    Primary Physician
                    </label>
                    <input
                    type="text"
                    name="primaryPhysician"
                    className="form-input"
                    value={formData.primaryPhysician}
                    onChange={handleChange}
                    placeholder="Doctor's name"
                    />
                </div>
                
                <div className="form-group full-width">
                    <label className="form-label">
                    <FaFileMedical className="input-icon" />
                    Medical History
                    </label>
                    <textarea
                    name="medicalHistory"
                    className="form-input"
                    rows="3"
                    value={formData.medicalHistory}
                    onChange={handleChange}
                    placeholder="Any previous medical conditions or surgeries"
                    ></textarea>
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaPhone className="input-icon" />
                    Emergency Contact Name
                    </label>
                    <input
                    type="text"
                    name="emergencyContactName"
                    className="form-input"
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaPhone className="input-icon" />
                    Emergency Contact Number
                    </label>
                    <input
                    type="tel"
                    name="emergencyContactNumber"
                    className="form-input"
                    value={formData.emergencyContactNumber}
                    onChange={handleChange}
                    />
                </div>
                </div>
            </div>
            )}
            
            {(activeTab === 'insurance' || activeTab === 'all') && (
            <div className="form-section">
                <div className="section-header">
                <FaUserShield className="section-icon" />
                <h3>Insurance Information</h3>
                </div>
                
                <div className="form-grid">
                <div className="form-group">
                    <label className="form-label">
                    <FaIdCard className="input-icon" />
                    Insurance Provider
                    </label>
                    <input
                    type="text"
                    name="insuranceProvider"
                    className="form-input"
                    value={formData.insuranceProvider}
                    onChange={handleChange}
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaIdCard className="input-icon" />
                    Insurance Number
                    </label>
                    <input
                    type="text"
                    name="insuranceNumber"
                    className="form-input"
                    value={formData.insuranceNumber}
                    onChange={handleChange}
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaBirthdayCake className="input-icon" />
                    Policy Start Date
                    </label>
                    <input
                    type="date"
                    name="policyStartDate"
                    className="form-input"
                    value={formData.policyStartDate}
                    onChange={handleChange}
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">
                    <FaBirthdayCake className="input-icon" />
                    Policy End Date
                    </label>
                    <input
                    type="date"
                    name="policyEndDate"
                    className="form-input"
                    value={formData.policyEndDate}
                    onChange={handleChange}
                    />
                </div>
                </div>
            </div>
            )}
            
            <div className="form-actions">
            {activeTab !== 'all' && (
                <button 
                type="button" 
                className="secondary-button"
                onClick={() => setActiveTab('all')}
                >
                Show All Sections
                </button>
            )}
            <button
                type="submit"
                className="primary-button"
            >
                Register Patient
            </button>
            </div>
        </form>
        </div>
    );
    }

    export default PatientRegistration;