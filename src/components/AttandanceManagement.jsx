import React, { useState } from 'react';
import '../styles/AttandanceManagement.css';

const AttendanceManagement = () => {
    const [records, setRecords] = useState([
        { id: 1, name: 'Dr. Meera Sharma', role: 'Doctor', status: 'Present', time: '08:15 AM' },
        { id: 2, name: 'Nurse Anita Patel', role: 'Nurse', status: 'Absent', time: '--' },
        { id: 3, name: 'Dr. Rajesh Kumar', role: 'Doctor', status: 'Present', time: '09:30 AM' },
        { id: 4, name: 'Receptionist Priya', role: 'Staff', status: 'On Leave', time: '--' },
    ]);

    const [newRecord, setNewRecord] = useState({
        name: '',
        role: 'Doctor',
        status: 'Present'
    });

    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setNewRecord({
            ...newRecord,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        setRecords([
            ...records, 
            { 
                id: records.length + 1, 
                ...newRecord, 
                time: newRecord.status === 'Present' ? timeString : '--' 
            }
        ]);
        setNewRecord({ name: '', role: 'Doctor', status: 'Present' });
    };

    const deleteRecord = (id) => {
        setRecords(records.filter(record => record.id !== id));
    };

    const toggleStatus = (id) => {
        setRecords(records.map(record => {
            if (record.id === id) {
                const newStatus = record.status === 'Present' ? 'Absent' : 'Present';
                const now = new Date();
                const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                return {
                    ...record,
                    status: newStatus,
                    time: newStatus === 'Present' ? timeString : '--'
                };
            }
            return record;
        }));
    };

    const filteredRecords = records.filter(record => {
        const matchesFilter = filter === 'All' || record.status === filter;
        const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             record.role.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const stats = {
        total: records.length,
        present: records.filter(r => r.status === 'Present').length,
        absent: records.filter(r => r.status === 'Absent').length,
        onLeave: records.filter(r => r.status === 'On Leave').length
    };

    return (
        <div className="attendance-container">
            <header className="attendance-header">
                <h2>Healthcare Staff Attendance</h2>
                <p className="current-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </header>

            <div className="stats-container">
                <div className="stat-card total">
                    <h3>Total Staff</h3>
                    <p>{stats.total}</p>
                </div>
                <div className="stat-card present">
                    <h3>Present</h3>
                    <p>{stats.present}</p>
                </div>
                <div className="stat-card absent">
                    <h3>Absent</h3>
                    <p>{stats.absent}</p>
                </div>
                <div className="stat-card on-leave">
                    <h3>On Leave</h3>
                    <p>{stats.onLeave}</p>
                </div>
            </div>

            <div className="controls-section">
                <div className="search-filter">
                    <input
                        type="text"
                        placeholder="Search by name or role..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="All">All Statuses</option>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="On Leave">On Leave</option>
                    </select>
                </div>
            </div>

            <div className="attendance-form-container">
                <h3>Mark New Attendance</h3>
                <form onSubmit={handleSubmit} className="attendance-form">
                    <div className="form-group">
                        <label>Staff Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter full name"
                            value={newRecord.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <select name="role" value={newRecord.role} onChange={handleChange} required>
                            <option value="Doctor">Doctor</option>
                            <option value="Nurse">Nurse</option>
                            <option value="Technician">Technician</option>
                            <option value="Staff">Administrative Staff</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select name="status" value={newRecord.status} onChange={handleChange}>
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="On Leave">On Leave</option>
                        </select>
                    </div>
                    <button type="submit" className="submit-btn">
                        {newRecord.status === 'Present' ? 'Mark Present' : 'Record Status'}
                    </button>
                </form>
            </div>

            <div className="attendance-list-container">
                <h3>Today's Attendance Records ({filteredRecords.length})</h3>
                {filteredRecords.length > 0 ? (
                    <table className="attendance-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Time</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.map((rec) => (
                                <tr key={rec.id} className={`status-${rec.status.toLowerCase().replace(' ', '-')}`}>
                                    <td>{rec.id}</td>
                                    <td>{rec.name}</td>
                                    <td>{rec.role}</td>
                                    <td>
                                        <span className={`status-badge ${rec.status.toLowerCase().replace(' ', '-')}`}>
                                            {rec.status}
                                        </span>
                                    </td>
                                    <td>{rec.time}</td>
                                    <td>
                                        <button 
                                            onClick={() => toggleStatus(rec.id)} 
                                            className="action-btn toggle-btn"
                                        >
                                            Toggle Status
                                        </button>
                                        <button 
                                            onClick={() => deleteRecord(rec.id)} 
                                            className="action-btn delete-btn"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="no-records">
                        <p>No attendance records found matching your criteria.</p>
                    </div>
                )}
            </div>

            <div className="summary-section">
                <h3>Daily Summary</h3>
                <p>
                    {stats.present > 0 ? `${stats.present} staff members are present today.` : 'No staff present today.'}
                    {stats.absent > 0 && ` ${stats.absent} absent.`}
                    {stats.onLeave > 0 && ` ${stats.onLeave} on leave.`}
                </p>
                {stats.present / stats.total < 0.7 && (
                    <div className="alert warning">
                        Warning: Less than 70% staff present today. Consider rescheduling non-essential services.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AttendanceManagement;