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
import { registerPatient } from '../services/patientService';

// Reusable FormInput Component
const FormInput = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  required = false, 
  placeholder = '', 
  icon: Icon,
  options = [],
  rows = 3,
  className = ''
}) => {
  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            name={name}
            className={`form-input ${className}`}
            value={value}
            onChange={onChange}
            required={required}
          >
            <option value="">{placeholder || `Select ${label}`}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'textarea':
        return (
          <textarea
            name={name}
            className={`form-input ${className}`}
            rows={rows}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
          />
        );
      
      default:
        return (
          <input
            type={type}
            name={name}
            className={`form-input ${className}`}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
          />
        );
    }
  };

  return (
    <div className={`form-group ${className.includes('full-width') ? 'full-width' : ''}`}>
      <label className="form-label">
        {Icon && <Icon className="input-icon" />}
        {label} {required && '*'}
      </label>
      {renderInput()}
    </div>
  );
};

// Reusable FormSection Component
const FormSection = ({ title, icon: Icon, children, className = '' }) => {
  return (
    <div className={`form-section ${className}`}>
      <div className="section-header">
        {Icon && <Icon className="section-icon" />}
        <h3>{title}</h3>
      </div>
      <div className="form-grid">
        {children}
      </div>
    </div>
  );
};

// Reusable TabNavigation Component
const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="tabs">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            type="button"
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <Icon className="tab-icon" />
            <span className="tab-label">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// Reusable MessageDisplay Component
const MessageDisplay = ({ successMessage, errorMessage }) => {
  return (
    <>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
    </>
  );
};

// Configuration
const TABS_CONFIG = [
  {
    id: 'personal',
    label: 'Personal',
    icon: FaUserPlus
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: FaPhone
  },
  {
    id: 'medical',
    label: 'Medical',
    icon: FaNotesMedical
  },
  {
    id: 'insurance',
    label: 'Insurance',
    icon: FaUserShield
  }
];

const FORM_FIELDS = {
  personal: [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      required: true,
      icon: FaUserPlus
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      required: true,
      icon: FaUserPlus
    },
    {
      name: 'dob',
      label: 'Date of Birth',
      type: 'date',
      required: true,
      icon: FaBirthdayCake
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      required: true,
      icon: FaUserPlus,
      options: [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Non-binary', label: 'Non-binary' },
        { value: 'Other', label: 'Other' },
        { value: 'Prefer not to say', label: 'Prefer not to say' }
      ]
    }
  ],
  
  contact: [
    {
      name: 'contactNumber',
      label: 'Contact Number',
      type: 'tel',
      required: true,
      icon: FaPhone
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      icon: FaEnvelope
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      icon: FaMapMarkerAlt,
      className: 'full-width'
    },
    {
      name: 'city',
      label: 'City',
      type: 'text'
    },
    {
      name: 'state',
      label: 'State',
      type: 'text'
    },
    {
      name: 'zipCode',
      label: 'ZIP Code',
      type: 'text'
    }
  ],
  
  medical: [
    {
      name: 'bloodGroup',
      label: 'Blood Group',
      type: 'select',
      icon: FaClinicMedical,
      options: [
        { value: 'A+', label: 'A+' },
        { value: 'A-', label: 'A-' },
        { value: 'B+', label: 'B+' },
        { value: 'B-', label: 'B-' },
        { value: 'AB+', label: 'AB+' },
        { value: 'AB-', label: 'AB-' },
        { value: 'O+', label: 'O+' },
        { value: 'O-', label: 'O-' }
      ]
    },
    {
      name: 'allergies',
      label: 'Allergies',
      type: 'text',
      icon: FaClinicMedical,
      placeholder: 'List any allergies'
    },
    {
      name: 'currentMedications',
      label: 'Current Medications',
      type: 'text',
      icon: FaFileMedical,
      placeholder: 'Current medications'
    },
    {
      name: 'primaryPhysician',
      label: 'Primary Physician',
      type: 'text',
      icon: FaUserPlus,
      placeholder: "Doctor's name"
    },
    {
      name: 'medicalHistory',
      label: 'Medical History',
      type: 'textarea',
      icon: FaFileMedical,
      placeholder: 'Any previous medical conditions or surgeries',
      className: 'full-width',
      rows: 3
    },
    {
      name: 'emergencyContactName',
      label: 'Emergency Contact Name',
      type: 'text',
      icon: FaPhone
    },
    {
      name: 'emergencyContactNumber',
      label: 'Emergency Contact Number',
      type: 'tel',
      icon: FaPhone
    }
  ],
  
  insurance: [
    {
      name: 'insuranceProvider',
      label: 'Insurance Provider',
      type: 'text',
      icon: FaIdCard
    },
    {
      name: 'insuranceNumber',
      label: 'Insurance Number',
      type: 'text',
      icon: FaIdCard
    },
    {
      name: 'policyStartDate',
      label: 'Policy Start Date',
      type: 'date',
      icon: FaBirthdayCake
    },
    {
      name: 'policyEndDate',
      label: 'Policy End Date',
      type: 'date',
      icon: FaBirthdayCake
    }
  ]
};

const INITIAL_FORM_DATA = {
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
};

// Custom Hook for Patient Registration Logic
const usePatientRegistration = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [activeTab, setActiveTab] = useState('personal');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await registerPatient(formData);
      setSuccessMessage('✅ Patient registration successful!');
      setErrorMessage('');
      
      setTimeout(() => {
        resetForm();
      }, 3000);
    } catch (error) {
      setErrorMessage('❌ Failed to register patient. Please try again.', error);
      setSuccessMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    activeTab,
    successMessage,
    errorMessage,
    isLoading,
    handleChange,
    setActiveTab,
    handleSubmit,
    resetForm
  };
};

// Main PatientRegistration Component
function PatientRegistration() {
  const {
    formData,
    activeTab,
    successMessage,
    errorMessage,
    isLoading,
    handleChange,
    setActiveTab,
    handleSubmit
  } = usePatientRegistration();

  const renderFormFields = (fields) => {
    return fields.map((field) => (
      <FormInput
        key={field.name}
        {...field}
        value={formData[field.name]}
        onChange={handleChange}
      />
    ));
  };

  const renderSection = (sectionKey, title, icon) => {
    if (activeTab !== sectionKey && activeTab !== 'all') return null;

    return (
      <FormSection title={title} icon={icon}>
        {renderFormFields(FORM_FIELDS[sectionKey])}
      </FormSection>
    );
  };

  return (
    <div className="registration-container">
      <div className="registration-header">
        <h2 className="registration-title">
          <FaUserPlus className="header-icon" />
          Patient Registration
        </h2>
        <p className="registration-subtitle">
          Complete all sections to register a new patient
        </p>
      </div>

      <MessageDisplay 
        successMessage={successMessage} 
        errorMessage={errorMessage} 
      />

      <TabNavigation 
        tabs={TABS_CONFIG}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <form onSubmit={handleSubmit} className="registration-form">
        {renderSection('personal', 'Personal Information', GiHealthNormal)}
        {renderSection('contact', 'Contact Information', FaMapMarkerAlt)}
        {renderSection('medical', 'Medical Information', FaNotesMedical)}
        {renderSection('insurance', 'Insurance Information', FaUserShield)}
        
        <div className="form-actions">
          {activeTab !== 'all' && (
            <button 
              type="button" 
              className="secondary-button"
              onClick={() => setActiveTab('all')}
              disabled={isLoading}
            >
              Show All Sections
            </button>
          )}
          <button
            type="submit"
            className="primary-button"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register Patient'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PatientRegistration;