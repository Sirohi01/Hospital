import React, { useState } from 'react';
import '../styles/DietaryManagement.css';

const DietaryManagement = () => {
    const [diets, setDiets] = useState([
        { 
            id: 1, 
            patientName: 'Rohit Singh', 
            dietType: 'Vegetarian', 
            notes: 'Low salt, high fiber', 
            startDate: '2023-05-01',
            status: 'Active'
        },
        { 
            id: 2, 
            patientName: 'Anjali Verma', 
            dietType: 'Diabetic', 
            notes: 'No sugar, controlled carbs', 
            startDate: '2023-05-10',
            status: 'Active'
        },
        { 
            id: 3, 
            patientName: 'Priya Patel', 
            dietType: 'Keto', 
            notes: 'High fat, low carb', 
            startDate: '2023-04-15',
            status: 'Completed'
        },
    ]);

    const [newDiet, setNewDiet] = useState({
        patientName: '',
        dietType: '',
        notes: '',
        startDate: new Date().toISOString().split('T')[0],
        status: 'Active'
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [editingId, setEditingId] = useState(null);

    const handleChange = (e) => {
        setNewDiet({
            ...newDiet,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            // Update existing diet
            setDiets(diets.map(diet => 
                diet.id === editingId ? { ...newDiet, id: editingId } : diet
            ));
            setEditingId(null);
        } else {
            // Add new diet
            setDiets([...diets, { 
                id: diets.length > 0 ? Math.max(...diets.map(d => d.id)) + 1 : 1, 
                ...newDiet 
            }]);
        }
        setNewDiet({ 
            patientName: '', 
            dietType: '', 
            notes: '', 
            startDate: new Date().toISOString().split('T')[0],
            status: 'Active'
        });
    };

    const handleEdit = (diet) => {
        setNewDiet(diet);
        setEditingId(diet.id);
    };

    const handleDelete = (id) => {
        setDiets(diets.filter(diet => diet.id !== id));
    };

    const handleStatusChange = (id, newStatus) => {
        setDiets(diets.map(diet => 
            diet.id === id ? { ...diet, status: newStatus } : diet
        ));
    };

    const filteredDiets = diets.filter(diet => {
        const matchesSearch = diet.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            diet.dietType.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || diet.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const dietTypes = ['Vegetarian', 'Diabetic', 'Keto', 'Vegan', 'Gluten-Free', 'Low-Carb', 'Low-Fat', 'Renal', 'Cardiac'];

    return (
        <div className="dietary-container">
            <header className="dietary-header">
                <h2>Dietary Management System</h2>
                <p>Manage and track patient diet plans efficiently</p>
            </header>

            <div className="dietary-controls">
                <div className="search-filter">
                    <input
                        type="text"
                        placeholder="Search patients or diet types..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select 
                        value={filterStatus} 
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                    </select>
                </div>
            </div>

            <div className="dietary-content">
                <div className="dietary-form-section">
                    <h3>{editingId ? 'Edit Diet Plan' : 'Add New Diet Plan'}</h3>
                    <form onSubmit={handleSubmit} className="dietary-form">
                        <div className="form-group">
                            <label>Patient Name</label>
                            <input
                                type="text"
                                name="patientName"
                                placeholder="Enter patient name"
                                value={newDiet.patientName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Diet Type</label>
                            <select
                                name="dietType"
                                value={newDiet.dietType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Diet Type</option>
                                {dietTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                value={newDiet.startDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Status</label>
                            <select
                                name="status"
                                value={newDiet.status}
                                onChange={handleChange}
                                required
                            >
                                <option value="Active">Active</option>
                                <option value="Completed">Completed</option>
                                <option value="On Hold">On Hold</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Notes</label>
                            <textarea
                                name="notes"
                                placeholder="Enter special instructions or notes"
                                value={newDiet.notes}
                                onChange={handleChange}
                                rows="3"
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="primary-btn">
                                {editingId ? 'Update Plan' : 'Add Plan'}
                            </button>
                            {editingId && (
                                <button 
                                    type="button" 
                                    className="secondary-btn"
                                    onClick={() => {
                                        setEditingId(null);
                                        setNewDiet({ 
                                            patientName: '', 
                                            dietType: '', 
                                            notes: '', 
                                            startDate: new Date().toISOString().split('T')[0],
                                            status: 'Active'
                                        });
                                    }}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="dietary-list-section">
                    <div className="list-header">
                        <h3>Current Diet Plans</h3>
                        <div className="stats">
                            <span>Total: {diets.length}</span>
                            <span>Active: {diets.filter(d => d.status === 'Active').length}</span>
                        </div>
                    </div>

                    {filteredDiets.length === 0 ? (
                        <div className="empty-state">
                            <p>No diet plans found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="dietary-list">
                            {filteredDiets.map((diet) => (
                                <div key={diet.id} className={`dietary-card ${diet.status.toLowerCase()}`}>
                                    <div className="card-header">
                                        <strong>{diet.patientName}</strong>
                                        <span className={`status-badge ${diet.status.toLowerCase()}`}>
                                            {diet.status}
                                        </span>
                                    </div>
                                    <div className="card-body">
                                        <p><strong>Diet Type:</strong> {diet.dietType}</p>
                                        <p><strong>Start Date:</strong> {diet.startDate}</p>
                                        <p><strong>Notes:</strong> {diet.notes}</p>
                                    </div>
                                    <div className="card-actions">
                                        <button 
                                            onClick={() => handleEdit(diet)}
                                            className="action-btn edit"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(diet.id)}
                                            className="action-btn delete"
                                        >
                                            Delete
                                        </button>
                                        <select
                                            value={diet.status}
                                            onChange={(e) => handleStatusChange(diet.id, e.target.value)}
                                            className="status-select"
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Completed">Completed</option>
                                            <option value="On Hold">On Hold</option>
                                        </select>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DietaryManagement;