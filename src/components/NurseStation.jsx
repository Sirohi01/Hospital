import React, { useState } from 'react';
import '../styles/NurseStation.css';

const NurseStation = () => {
    const [tasks, setTasks] = useState([
        { 
            id: 1, 
            patientName: 'Suresh Kumar', 
            task: 'Check vitals', 
            status: 'Pending',
            priority: 'Medium',
            assignedTo: 'Nurse Smith',
            dueTime: '10:00 AM',
            notes: 'Patient has history of hypertension'
        },
        { 
            id: 2, 
            patientName: 'Neha Sharma', 
            task: 'Administer medication', 
            status: 'Completed',
            priority: 'High',
            assignedTo: 'Nurse Johnson',
            dueTime: '09:30 AM',
            notes: 'Give with food'
        },
        { 
            id: 3, 
            patientName: 'Raj Patel', 
            task: 'Change dressing', 
            status: 'Pending',
            priority: 'Low',
            assignedTo: 'Nurse Williams',
            dueTime: '11:00 AM',
            notes: 'Check for signs of infection'
        },
    ]);

    const [newTask, setNewTask] = useState({
        patientName: '',
        task: '',
        status: 'Pending',
        priority: 'Medium',
        assignedTo: '',
        dueTime: '',
        notes: ''
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [filterPriority, setFilterPriority] = useState('All');
    const [editingId, setEditingId] = useState(null);

    const handleChange = (e) => {
        setNewTask({
            ...newTask,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            // Update existing task
            setTasks(tasks.map(task => 
                task.id === editingId ? { ...newTask, id: editingId } : task
            ));
            setEditingId(null);
        } else {
            // Add new task
            setTasks([...tasks, { 
                id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1, 
                ...newTask 
            }]);
        }
        setNewTask({ 
            patientName: '', 
            task: '', 
            status: 'Pending',
            priority: 'Medium',
            assignedTo: '',
            dueTime: '',
            notes: ''
        });
    };

    const markCompleted = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, status: 'Completed' } : task
        ));
    };

    const handleEdit = (task) => {
        setNewTask(task);
        setEditingId(task.id);
    };

    const handleDelete = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            task.task.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || task.status === filterStatus;
        const matchesPriority = filterPriority === 'All' || task.priority === filterPriority;
        return matchesSearch && matchesStatus && matchesPriority;
    });

    const priorityOptions = ['Low', 'Medium', 'High'];
    const nurseStaff = ['Nurse Smith', 'Nurse Johnson', 'Nurse Williams', 'Nurse Brown', 'Nurse Davis'];
    const commonTasks = [
        'Check vitals', 
        'Administer medication', 
        'Change dressing',
        'Assist with mobility',
        'Monitor IV',
        'Collect lab samples',
        'Document patient status',
        'Patient education'
    ];

    return (
        <div className="nurse-container">
            <header className="nurse-header">
                <h2>Nurse Station Dashboard</h2>
                <p>Manage patient care tasks efficiently</p>
            </header>

            <div className="nurse-controls">
                <div className="search-filters">
                    <input
                        type="text"
                        placeholder="Search patients or tasks..."
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
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Urgent">Urgent</option>
                        </select>
                        <select 
                            value={filterPriority} 
                            onChange={(e) => setFilterPriority(e.target.value)}
                            className="filter-select"
                        >
                            <option value="All">All Priorities</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="nurse-content">
                <div className="task-form-section">
                    <h3>{editingId ? 'Edit Task' : 'Add New Task'}</h3>
                    <form onSubmit={handleSubmit} className="task-form">
                        <div className="form-group">
                            <label>Patient Name</label>
                            <input
                                type="text"
                                name="patientName"
                                placeholder="Enter patient name"
                                value={newTask.patientName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Task</label>
                            <select
                                name="task"
                                value={newTask.task}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Task</option>
                                {commonTasks.map(task => (
                                    <option key={task} value={task}>{task}</option>
                                ))}
                                <option value="Other">Other (specify in notes)</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Priority</label>
                            <div className="priority-options">
                                {priorityOptions.map(priority => (
                                    <label key={priority} className="priority-option">
                                        <input
                                            type="radio"
                                            name="priority"
                                            value={priority}
                                            checked={newTask.priority === priority}
                                            onChange={handleChange}
                                        />
                                        {priority}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Assigned To</label>
                            <select
                                name="assignedTo"
                                value={newTask.assignedTo}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Nurse</option>
                                {nurseStaff.map(nurse => (
                                    <option key={nurse} value={nurse}>{nurse}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Due Time</label>
                            <input
                                type="time"
                                name="dueTime"
                                value={newTask.dueTime}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Notes</label>
                            <textarea
                                name="notes"
                                placeholder="Additional instructions or details"
                                value={newTask.notes}
                                onChange={handleChange}
                                rows="3"
                            />
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="primary-btn">
                                {editingId ? 'Update Task' : 'Add Task'}
                            </button>
                            {editingId && (
                                <button 
                                    type="button" 
                                    className="secondary-btn"
                                    onClick={() => {
                                        setEditingId(null);
                                        setNewTask({ 
                                            patientName: '', 
                                            task: '', 
                                            status: 'Pending',
                                            priority: 'Medium',
                                            assignedTo: '',
                                            dueTime: '',
                                            notes: ''
                                        });
                                    }}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="task-list-section">
                    <div className="list-header">
                        <h3>Assigned Tasks</h3>
                        <div className="stats">
                            <span>Total: {tasks.length}</span>
                            <span>Pending: {tasks.filter(t => t.status === 'Pending').length}</span>
                            <span>Completed: {tasks.filter(t => t.status === 'Completed').length}</span>
                        </div>
                    </div>

                    {filteredTasks.length === 0 ? (
                        <div className="empty-state">
                            <p>No tasks found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="task-list">
                            {filteredTasks.map((task) => (
                                <div key={task.id} className={`task-card ${task.status.toLowerCase()} ${task.priority.toLowerCase()}`}>
                                    <div className="card-header">
                                        <div>
                                            <strong>{task.patientName}</strong>
                                            <span className="assigned-to">Assigned to: {task.assignedTo}</span>
                                        </div>
                                        <div className="task-meta">
                                            <span className={`status-badge ${task.status.toLowerCase()}`}>
                                                {task.status}
                                            </span>
                                            <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                                                {task.priority}
                                            </span>
                                            {task.dueTime && <span className="due-time">⏰ {task.dueTime}</span>}
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <p className="task-title">{task.task}</p>
                                        {task.notes && <p className="task-notes">Notes: {task.notes}</p>}
                                    </div>
                                    <div className="card-actions">
                                        {task.status !== 'Completed' && (
                                            <button 
                                                onClick={() => markCompleted(task.id)}
                                                className="complete-btn"
                                            >
                                                Mark Completed
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => handleEdit(task)}
                                            className="edit-btn"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(task.id)}
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

export default NurseStation;