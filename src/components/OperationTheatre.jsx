import React, { useState } from 'react';
import '../styles/OperationTheatre.css';

const OperationTheatre = () => {
    const [surgeries, setSurgeries] = useState([
        { 
            id: 1, 
            patient: 'Rahul Singh', 
            procedure: 'Appendectomy', 
            surgeon: 'Dr. Mehta', 
            status: 'Scheduled',
            date: '2023-06-15',
            time: '09:00',
            theatre: 'OT-1',
            notes: 'Patient has allergy to penicillin',
            priority: 'High'
        },
        { 
            id: 2, 
            patient: 'Priya Verma', 
            procedure: 'Gallbladder Removal', 
            surgeon: 'Dr. Kapoor', 
            status: 'Completed',
            date: '2023-06-14',
            time: '11:30',
            theatre: 'OT-2',
            notes: 'Laparoscopic procedure',
            priority: 'Medium'
        },
        { 
            id: 3, 
            patient: 'Arjun Patel', 
            procedure: 'Knee Replacement', 
            surgeon: 'Dr. Sharma', 
            status: 'In Progress',
            date: '2023-06-15',
            time: '14:00',
            theatre: 'OT-3',
            notes: 'Requires special implants',
            priority: 'High'
        },
    ]);

    const [newSurgery, setNewSurgery] = useState({
        patient: '',
        procedure: '',
        surgeon: '',
        status: 'Scheduled',
        date: new Date().toISOString().split('T')[0],
        time: '09:00',
        theatre: 'OT-1',
        notes: '',
        priority: 'Medium'
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterTheatre, setFilterTheatre] = useState('All');
    const [editingId, setEditingId] = useState(null);

    const handleChange = (e) => {
        setNewSurgery({
            ...newSurgery,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            setSurgeries(surgeries.map(s => 
                s.id === editingId ? { ...newSurgery, id: editingId } : s
            ));
            setEditingId(null);
        } else {
            setSurgeries([...surgeries, { 
                id: surgeries.length > 0 ? Math.max(...surgeries.map(s => s.id)) + 1 : 1, 
                ...newSurgery 
            }]);
        }
        setNewSurgery({ 
            patient: '', 
            procedure: '', 
            surgeon: '', 
            status: 'Scheduled',
            date: new Date().toISOString().split('T')[0],
            time: '09:00',
            theatre: 'OT-1',
            notes: '',
            priority: 'Medium'
        });
    };

    const updateStatus = (id, newStatus) => {
        setSurgeries(surgeries.map(s => 
            s.id === id ? { ...s, status: newStatus } : s
        ));
    };

    const handleEdit = (surgery) => {
        setNewSurgery(surgery);
        setEditingId(surgery.id);
    };

    const handleDelete = (id) => {
        setSurgeries(surgeries.filter(s => s.id !== id));
    };

    const filteredSurgeries = surgeries.filter(surgery => {
        const matchesSearch = surgery.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            surgery.procedure.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            surgery.surgeon.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || surgery.status === filterStatus;
        const matchesTheatre = filterTheatre === 'All' || surgery.theatre === filterTheatre;
        return matchesSearch && matchesStatus && matchesTheatre;
    });

    const statusOptions = ['Scheduled', 'In Progress', 'Completed', 'Cancelled'];
    const theatreOptions = ['OT-1', 'OT-2', 'OT-3', 'OT-4'];
    const priorityOptions = ['Low', 'Medium', 'High', 'Emergency'];
    const commonProcedures = [
        'Appendectomy',
        'Gallbladder Removal',
        'Knee Replacement',
        'Hip Replacement',
        'Cataract Surgery',
        'Hernia Repair',
        'C-Section',
        'Tonsillectomy',
        'Angioplasty',
        'Bypass Surgery'
    ];
    const surgeonList = [
        'Dr. Mehta',
        'Dr. Kapoor',
        'Dr. Sharma',
        'Dr. Patel',
        'Dr. Gupta',
        'Dr. Reddy',
        'Dr. Khan',
        'Dr. Joshi'
    ];

    return (
        <div className="ot-container">
            <header className="ot-header">
                <h2>Operation Theatre Management System</h2>
                <p>Manage surgical procedures and theatre schedules</p>
            </header>

            <div className="ot-controls">
                <div className="search-filters">
                    <input
                        type="text"
                        placeholder="Search patients, procedures or surgeons..."
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
                            value={filterTheatre} 
                            onChange={(e) => setFilterTheatre(e.target.value)}
                            className="filter-select"
                        >
                            <option value="All">All Theatres</option>
                            {theatreOptions.map(theatre => (
                                <option key={theatre} value={theatre}>{theatre}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="ot-content">
                <div className="surgery-form-section">
                    <h3>{editingId ? 'Edit Surgery' : 'Schedule New Surgery'}</h3>
                    <form onSubmit={handleSubmit} className="surgery-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>Patient Name</label>
                                <input
                                    type="text"
                                    name="patient"
                                    placeholder="Enter patient name"
                                    value={newSurgery.patient}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Procedure</label>
                                <select
                                    name="procedure"
                                    value={newSurgery.procedure}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Procedure</option>
                                    {commonProcedures.map(proc => (
                                        <option key={proc} value={proc}>{proc}</option>
                                    ))}
                                    <option value="Other">Other (specify in notes)</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Surgeon</label>
                                <select
                                    name="surgeon"
                                    value={newSurgery.surgeon}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Surgeon</option>
                                    {surgeonList.map(surgeon => (
                                        <option key={surgeon} value={surgeon}>{surgeon}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Theatre</label>
                                <select
                                    name="theatre"
                                    value={newSurgery.theatre}
                                    onChange={handleChange}
                                    required
                                >
                                    {theatreOptions.map(theatre => (
                                        <option key={theatre} value={theatre}>{theatre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={newSurgery.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Time</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={newSurgery.time}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Priority</label>
                                <select
                                    name="priority"
                                    value={newSurgery.priority}
                                    onChange={handleChange}
                                    required
                                >
                                    {priorityOptions.map(priority => (
                                        <option key={priority} value={priority}>{priority}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Status</label>
                            <select
                                name="status"
                                value={newSurgery.status}
                                onChange={handleChange}
                                required
                            >
                                {statusOptions.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Notes</label>
                            <textarea
                                name="notes"
                                placeholder="Special instructions, allergies, or additional information"
                                value={newSurgery.notes}
                                onChange={handleChange}
                                rows="3"
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="primary-btn">
                                {editingId ? 'Update Surgery' : 'Schedule Surgery'}
                            </button>
                            {editingId && (
                                <button 
                                    type="button" 
                                    className="secondary-btn"
                                    onClick={() => {
                                        setEditingId(null);
                                        setNewSurgery({ 
                                            patient: '', 
                                            procedure: '', 
                                            surgeon: '', 
                                            status: 'Scheduled',
                                            date: new Date().toISOString().split('T')[0],
                                            time: '09:00',
                                            theatre: 'OT-1',
                                            notes: '',
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

                <div className="surgery-list-section">
                    <div className="list-header">
                        <h3>Surgical Procedures</h3>
                        <div className="stats">
                            <span>Total: {surgeries.length}</span>
                            <span>Scheduled: {surgeries.filter(s => s.status === 'Scheduled').length}</span>
                            <span>In Progress: {surgeries.filter(s => s.status === 'In Progress').length}</span>
                        </div>
                    </div>

                    {filteredSurgeries.length === 0 ? (
                        <div className="empty-state">
                            <p>No surgeries found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="surgery-list">
                            {filteredSurgeries.map((surgery) => (
                                <div key={surgery.id} className={`surgery-card ${surgery.status.toLowerCase().replace(' ', '-')} ${surgery.priority.toLowerCase()}`}>
                                    <div className="card-header">
                                        <div>
                                            <strong>{surgery.patient}</strong>
                                            <span className="procedure">{surgery.procedure}</span>
                                        </div>
                                        <div className="surgery-meta">
                                            <span className={`status-badge ${surgery.status.toLowerCase().replace(' ', '-')}`}>
                                                {surgery.status}
                                            </span>
                                            <span className={`priority-badge ${surgery.priority.toLowerCase()}`}>
                                                {surgery.priority}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="surgery-details">
                                            <p><strong>Surgeon:</strong> {surgery.surgeon}</p>
                                            <p><strong>Theatre:</strong> {surgery.theatre}</p>
                                            <p><strong>Date:</strong> {surgery.date} at {surgery.time}</p>
                                            {surgery.notes && (
                                                <p className="notes"><strong>Notes:</strong> {surgery.notes}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="card-actions">
                                        <select
                                            value={surgery.status}
                                            onChange={(e) => updateStatus(surgery.id, e.target.value)}
                                            className="status-select"
                                        >
                                            {statusOptions.map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                        <button 
                                            onClick={() => handleEdit(surgery)}
                                            className="edit-btn"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(surgery.id)}
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
        </div>
    );
};

export default OperationTheatre;