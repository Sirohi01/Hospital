import React, { useState, useEffect } from 'react';
import { FaSearch, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { getPatients } from '../services/patientService';

const Patient = () => {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPatients();
    }, []);

    useEffect(() => {
        const patientArray = Array.isArray(patients) ? patients : [];
        const filtered = patientArray.filter(patient => {
            const searchLower = searchTerm.toLowerCase();
            return (
                patient.firstName?.toLowerCase().includes(searchLower) ||
                patient.lastName?.toLowerCase().includes(searchLower) ||
                (patient.email && patient.email.toLowerCase().includes(searchLower)) ||
                (patient.contactNumber && patient.contactNumber.includes(searchTerm)) ||
                (patient.address && (
                    (patient.address.street && patient.address.street.toLowerCase().includes(searchLower)) ||
                    (patient.address.city && patient.address.city.toLowerCase().includes(searchLower)) ||
                    (patient.address.state && patient.address.state.toLowerCase().includes(searchLower))
                ))
            );
        });
        setFilteredPatients(filtered);
    }, [searchTerm, patients]);

    const fetchPatients = async () => {
        try {
            setLoading(true);
            const response = await getPatients();
            
            // Extract the patients array from the response object
            const patientsData = response.patients || [];
            
            if (Array.isArray(patientsData)) {
                setPatients(patientsData);
                setFilteredPatients(patientsData);
            } else {
                console.error('API did not return an array:', response);
                setPatients([]);
                setFilteredPatients([]);
                setError('Invalid data format received from server');
            }
        } catch (err) {
            setError('Failed to fetch patients');
            console.error('Error fetching patients:', err);
            setPatients([]);
            setFilteredPatients([]);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Not provided';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatAddress = (address) => {
        if (!address) return 'Not provided';
        const { street, city, state, zipCode } = address;
        const parts = [street, city, state, zipCode].filter(part => part);
        return parts.length > 0 ? parts.join(', ') : 'Not provided';
    };

    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                fontSize: '18px',
                color: '#2c5282'
            }}>
                Loading patients...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                fontSize: '18px',
                color: '#e53e3e'
            }}>
                {error}
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '30px' }}>
                <h1 style={{ 
                    color: '#2c5282', 
                    marginBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <FaUser /> Patient Directory
                </h1>
                <p style={{ color: '#718096', margin: 0 }}>
                    {patients.length} registered patients
                </p>
            </div>

            {/* Search Bar */}
            <div style={{ 
                position: 'relative', 
                marginBottom: '30px',
                maxWidth: '500px'
            }}>
                <FaSearch style={{
                    position: 'absolute',
                    left: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#a0aec0'
                }} />
                <input
                    type="text"
                    placeholder="Search patients by name, email, phone, or address..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '12px 15px 12px 45px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '16px',
                        boxSizing: 'border-box'
                    }}
                />
            </div>

            {/* Patient Cards Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '40px'
            }}>
                {Array.isArray(filteredPatients) && filteredPatients.map(patient => (
                    <div
                        key={patient._id || patient.id}
                        onClick={() => setSelectedPatient(patient)}
                        style={{
                            border: '1px solid #e2e8f0',
                            borderRadius: '10px',
                            padding: '20px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            backgroundColor: '#fff',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        <h3 style={{ 
                            margin: '0 0 10px 0', 
                            color: '#2d3748',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <FaUser style={{ color: '#4299e1' }} /> 
                            {patient.firstName} {patient.lastName}
                        </h3>
                        
                        {patient.email && (
                            <p style={{ 
                                margin: '8px 0', 
                                color: '#4a5568',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <FaEnvelope style={{ color: '#718096' }} /> 
                                {patient.email}
                            </p>
                        )}
                        
                        {patient.contactNumber && (
                            <p style={{ 
                                margin: '8px 0', 
                                color: '#4a5568',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <FaPhone style={{ color: '#718096' }} /> 
                                {patient.contactNumber}
                            </p>
                        )}
                        
                        <p style={{ 
                            margin: '8px 0 0 0', 
                            color: '#4a5568',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px'
                        }}>
                            <FaMapMarkerAlt style={{ color: '#718096', marginTop: '4px' }} /> 
                            {formatAddress(patient.address)}
                        </p>
                    </div>
                ))}
            </div>

            {Array.isArray(filteredPatients) && filteredPatients.length === 0 && (
                <div style={{ 
                    textAlign: 'center', 
                    padding: '40px',
                    color: '#718096'
                }}>
                    {patients.length === 0 
                        ? 'No patients found in the system.' 
                        : 'No patients found matching your search.'
                    }
                </div>
            )}

            {/* Patient Detail Modal */}
            {selectedPatient && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }} onClick={() => setSelectedPatient(null)}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '30px',
                        maxWidth: '600px',
                        width: '100%',
                        maxHeight: '80vh',
                        overflowY: 'auto',
                        position: 'relative'
                    }} onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedPatient(null)}
                            style={{
                                position: 'absolute',
                                top: '15px',
                                right: '15px',
                                background: 'none',
                                border: 'none',
                                fontSize: '20px',
                                cursor: 'pointer',
                                color: '#718096'
                            }}
                        >
                            ×
                        </button>
                        
                        <h2 style={{ 
                            color: '#2c5282', 
                            marginBottom: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            <FaUser /> Patient Details
                        </h2>
                        
                        <div style={{ display: 'grid', gap: '15px' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                                <div style={{ flex: '1', minWidth: '200px' }}>
                                    <h4 style={{ margin: '0 0 8px 0', color: '#4a5568' }}>Personal Information</h4>
                                    <p style={{ margin: '5px 0' }}><strong>Name:</strong> {selectedPatient.firstName} {selectedPatient.lastName}</p>
                                    <p style={{ margin: '5px 0' }}><strong>Date of Birth:</strong> {formatDate(selectedPatient.dob)}</p>
                                    <p style={{ margin: '5px 0' }}><strong>Gender:</strong> {selectedPatient.gender}</p>
                                    {selectedPatient.bloodGroup && (
                                        <p style={{ margin: '5px 0' }}><strong>Blood Group:</strong> {selectedPatient.bloodGroup}</p>
                                    )}
                                </div>
                                
                                <div style={{ flex: '1', minWidth: '200px' }}>
                                    <h4 style={{ margin: '0 0 8px 0', color: '#4a5568' }}>Contact Information</h4>
                                    {selectedPatient.contactNumber && (
                                        <p style={{ margin: '5px 0' }}><strong>Phone:</strong> {selectedPatient.contactNumber}</p>
                                    )}
                                    {selectedPatient.email && (
                                        <p style={{ margin: '5px 0' }}><strong>Email:</strong> {selectedPatient.email}</p>
                                    )}
                                    <p style={{ margin: '5px 0' }}><strong>Address:</strong> {formatAddress(selectedPatient.address)}</p>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                                {(selectedPatient.allergies || selectedPatient.currentMedications || selectedPatient.medicalHistory) && (
                                    <div style={{ flex: '1', minWidth: '200px' }}>
                                        <h4 style={{ margin: '0 0 8px 0', color: '#4a5568' }}>Medical Information</h4>
                                        {selectedPatient.allergies && (
                                            <p style={{ margin: '5px 0' }}><strong>Allergies:</strong> {selectedPatient.allergies}</p>
                                        )}
                                        {selectedPatient.currentMedications && (
                                            <p style={{ margin: '5px 0' }}><strong>Current Medications:</strong> {selectedPatient.currentMedications}</p>
                                        )}
                                        {selectedPatient.medicalHistory && (
                                            <p style={{ margin: '5px 0' }}><strong>Medical History:</strong> {selectedPatient.medicalHistory}</p>
                                        )}
                                        {selectedPatient.primaryPhysician && (
                                            <p style={{ margin: '5px 0' }}><strong>Primary Physician:</strong> {selectedPatient.primaryPhysician}</p>
                                        )}
                                    </div>
                                )}
                                
                                {(selectedPatient.emergencyContact?.name || selectedPatient.insurance?.provider) && (
                                    <div style={{ flex: '1', minWidth: '200px' }}>
                                        <h4 style={{ margin: '0 0 8px 0', color: '#4a5568' }}>Additional Information</h4>
                                        {selectedPatient.emergencyContact?.name && (
                                            <p style={{ margin: '5px 0' }}>
                                                <strong>Emergency Contact:</strong> {selectedPatient.emergencyContact.name}
                                                {selectedPatient.emergencyContact?.number && ` (${selectedPatient.emergencyContact.number})`}
                                            </p>
                                        )}
                                        {selectedPatient.insurance?.provider && (
                                            <p style={{ margin: '5px 0' }}>
                                                <strong>Insurance:</strong> {selectedPatient.insurance.provider}
                                                {selectedPatient.insurance?.number && ` (${selectedPatient.insurance.number})`}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Patient;