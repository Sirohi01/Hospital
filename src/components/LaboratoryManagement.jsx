    import React, { useState } from 'react';
    import '../styles/LaboratoryManagement.css';
    import { FaFlask, FaSearch, FaFilePdf, FaPrint, FaEdit, FaTrash } from 'react-icons/fa';

    function LaboratoryManagement() {
    const [formData, setFormData] = useState({
        patientName: '',
        testName: '',
        testDate: '',
        result: '',
        status: 'pending'
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [tests, setTests] = useState([
        {
        id: 1,
        patientName: 'John Doe',
        testName: 'Complete Blood Count',
        testDate: '2023-06-15',
        result: 'Normal range for all parameters',
        status: 'completed'
        },
        {
        id: 2,
        patientName: 'Jane Smith',
        testName: 'Lipid Profile',
        testDate: '2023-06-10',
        result: 'High cholesterol detected',
        status: 'completed'
        },
        {
        id: 3,
        patientName: 'Robert Johnson',
        testName: 'Thyroid Function Test',
        testDate: '2023-06-18',
        result: 'Pending lab analysis',
        status: 'pending'
        }
    ]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTest = {
        id: tests.length + 1,
        ...formData,
        testDate: formData.testDate || new Date().toISOString().split('T')[0]
        };
        setTests([...tests, newTest]);
        alert('Laboratory Test Added Successfully!');
        setFormData({ 
        patientName: '', 
        testName: '', 
        testDate: '', 
        result: '',
        status: 'pending'
        });
    };

    const deleteTest = (id) => {
        setTests(tests.filter(test => test.id !== id));
    };

    const filteredTests = tests.filter(test =>
        test.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.testName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="lab-container">
        <div className="lab-header">
            <h2><FaFlask /> Laboratory Management</h2>
        </div>

        <div className="lab-content">
            <div className="lab-form-container">
            <h3>Add New Test</h3>
            <form onSubmit={handleSubmit} className="lab-form">
                <div className="form-group">
                <label>Patient Name</label>
                <input
                    type="text"
                    name="patientName"
                    placeholder="Enter patient name"
                    value={formData.patientName}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="form-group">
                <label>Test Name</label>
                <input
                    type="text"
                    name="testName"
                    placeholder="Enter test name"
                    value={formData.testName}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="form-group">
                <label>Test Date</label>
                <input
                    type="date"
                    name="testDate"
                    value={formData.testDate}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="form-group">
                <label>Test Result</label>
                <textarea
                    name="result"
                    placeholder="Enter test results"
                    value={formData.result}
                    onChange={handleChange}
                    required
                    rows="4"
                />
                </div>

                <div className="form-group">
                <label>Status</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="critical">Critical</option>
                </select>
                </div>

                <button type="submit" className="submit-btn">Add Test</button>
            </form>
            </div>

            <div className="lab-tests-container">
            <div className="tests-header">
                <h3>Test Records</h3>
                <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search tests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                </div>
            </div>

            {filteredTests.length > 0 ? (
                <div className="tests-list">
                {filteredTests.map(test => (
                    <div key={test.id} className="test-card">
                    <div className="test-info">
                        <div className="test-icon">
                        <FaFlask />
                        </div>
                        <div className="test-details">
                        <h4>{test.testName}</h4>
                        <p className="patient-name">{test.patientName}</p>
                        <p className="test-date">{test.testDate}</p>
                        <p className="test-result">{test.result}</p>
                        <span className={`status-badge ${test.status}`}>
                            {test.status}
                        </span>
                        </div>
                    </div>
                    <div className="test-actions">
                        <button className="action-btn print-btn">
                        <FaPrint /> Print
                        </button>
                        <button className="action-btn pdf-btn">
                        <FaFilePdf /> PDF
                        </button>
                        <button className="action-btn edit-btn">
                        <FaEdit /> Edit
                        </button>
                        <button 
                        className="action-btn delete-btn"
                        onClick={() => deleteTest(test.id)}
                        >
                        <FaTrash /> Delete
                        </button>
                    </div>
                    </div>
                ))}
                </div>
            ) : (
                <div className="no-tests">
                No test records found
                </div>
            )}
            </div>
        </div>
        </div>
    );
    }

    export default LaboratoryManagement;