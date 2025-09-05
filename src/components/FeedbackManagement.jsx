    import React, { useState } from 'react';
    import { 
    FaComment, 
    FaUser, 
    FaStar, 
    FaSearch, 
    FaFilter,
    FaCalendarAlt,
    FaThumbsUp,
    FaThumbsDown,
    FaReply,
    FaTrash
    } from 'react-icons/fa';
    import '../styles/Feedback.css';

    const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([
        {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        rating: 5,
        message: 'Excellent service! The staff was very helpful and professional.',
        date: '2023-06-15',
        type: 'compliment',
        status: 'new',
        response: ''
        },
        {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        rating: 3,
        message: 'The waiting time was longer than expected, but the doctor was great.',
        date: '2023-06-10',
        type: 'suggestion',
        status: 'in-progress',
        response: 'Thank you for your feedback. We are working to reduce wait times.'
        },
        {
        id: 3,
        name: 'Robert Johnson',
        email: 'robert@example.com',
        rating: 1,
        message: 'Very poor experience with the billing department.',
        date: '2023-06-05',
        type: 'complaint',
        status: 'resolved',
        response: 'We apologize for your experience. Our billing manager will contact you.'
        }
    ]);

    const [newFeedback, setNewFeedback] = useState({
        name: '',
        email: '',
        rating: 0,
        message: '',
        type: 'suggestion'
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [activeTab, setActiveTab] = useState('view');
    const [selectedFeedback, setSelectedFeedback] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFeedback({ ...newFeedback, [name]: value });
    };

    const handleRatingChange = (rating) => {
        setNewFeedback({ ...newFeedback, rating });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const feedback = {
        ...newFeedback,
        id: feedbacks.length + 1,
        date: new Date().toISOString().split('T')[0],
        status: 'new'
        };
        setFeedbacks([...feedbacks, feedback]);
        setNewFeedback({
        name: '',
        email: '',
        rating: 0,
        message: '',
        type: 'suggestion'
        });
        setActiveTab('view');
    };

    const handleResponseSubmit = (e) => {
        e.preventDefault();
        const response = e.target.response.value;
        const updatedFeedbacks = feedbacks.map(fb => 
        fb.id === selectedFeedback.id ? { ...fb, response, status: 'responded' } : fb
        );
        setFeedbacks(updatedFeedbacks);
        setSelectedFeedback(null);
    };

    const handleStatusChange = (id, status) => {
        const updatedFeedbacks = feedbacks.map(fb => 
        fb.id === id ? { ...fb, status } : fb
        );
        setFeedbacks(updatedFeedbacks);
    };

    const filteredFeedbacks = feedbacks.filter(fb => {
        const matchesSearch = fb.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            fb.message.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || fb.type === filter || fb.status === filter;
        return matchesSearch && matchesFilter;
    });

    const feedbackStats = {
        total: feedbacks.length,
        compliments: feedbacks.filter(fb => fb.type === 'compliment').length,
        complaints: feedbacks.filter(fb => fb.type === 'complaint').length,
        suggestions: feedbacks.filter(fb => fb.type === 'suggestion').length,
        new: feedbacks.filter(fb => fb.status === 'new').length
    };

    return (
        <div className="feedback-enhanced">
        <div className="feedback-header">
            <h2 className="feedback-title">
            <FaComment className="header-icon" />
            Patient Feedback Management
            </h2>
            <div className="feedback-stats">
            <div className="stat-item">
                <span className="stat-value">{feedbackStats.total}</span>
                <span className="stat-label">Total</span>
            </div>
            <div className="stat-item">
                <span className="stat-value">{feedbackStats.new}</span>
                <span className="stat-label">New</span>
            </div>
            </div>
        </div>

        <div className="tabs">
            <button 
            className={`tab ${activeTab === 'view' ? 'active' : ''}`}
            onClick={() => setActiveTab('view')}
            >
            View Feedback
            </button>
            <button 
            className={`tab ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
            >
            Add Feedback
            </button>
        </div>

        {activeTab === 'view' && (
            <div className="feedback-view">
            <div className="feedback-controls">
                <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search feedback..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                </div>
                <div className="filter-dropdown">
                <FaFilter className="filter-icon" />
                <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All Feedback</option>
                    <optgroup label="By Type">
                    <option value="compliment">Compliments</option>
                    <option value="complaint">Complaints</option>
                    <option value="suggestion">Suggestions</option>
                    </optgroup>
                    <optgroup label="By Status">
                    <option value="new">New</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    </optgroup>
                </select>
                </div>
            </div>

            <div className="feedback-list">
                {filteredFeedbacks.length === 0 ? (
                <div className="no-feedback">
                    No feedback matches your criteria
                </div>
                ) : (
                filteredFeedbacks.map(feedback => (
                    <div 
                    key={feedback.id} 
                    className={`feedback-item ${feedback.type} ${feedback.status}`}
                    onClick={() => setSelectedFeedback(feedback)}
                    >
                    <div className="feedback-header">
                        <div className="feedback-meta">
                        <h4>
                            <FaUser className="icon" />
                            {feedback.name}
                        </h4>
                        <span className="feedback-date">
                            <FaCalendarAlt className="icon" />
                            {feedback.date}
                        </span>
                        </div>
                        <div className="feedback-rating">
                        {[...Array(5)].map((_, i) => (
                            <FaStar 
                            key={i} 
                            className={`star ${i < feedback.rating ? 'filled' : ''}`}
                            />
                        ))}
                        </div>
                    </div>
                    <div className="feedback-content">
                        <p>{feedback.message}</p>
                    </div>
                    <div className="feedback-footer">
                        <span className={`feedback-type ${feedback.type}`}>
                        {feedback.type.charAt(0).toUpperCase() + feedback.type.slice(1)}
                        </span>
                        <span className={`feedback-status ${feedback.status}`}>
                        {feedback.status.replace('-', ' ')}
                        </span>
                    </div>
                    </div>
                ))
                )}
            </div>
            </div>
        )}

        {activeTab === 'add' && (
            <div className="feedback-form-container">
            <h3>
                <FaComment className="section-icon" />
                Submit Your Feedback
            </h3>
            <form onSubmit={handleSubmit} className="feedback-form">
                <div className="form-group">
                <label>
                    <FaUser className="input-icon" />
                    Your Name *
                </label>
                <input
                    type="text"
                    name="name"
                    value={newFeedback.name}
                    onChange={handleInputChange}
                    required
                />
                </div>
                <div className="form-group">
                <label>Email Address</label>
                <input
                    type="email"
                    name="email"
                    value={newFeedback.email}
                    onChange={handleInputChange}
                />
                </div>
                <div className="form-group">
                <label>Rating</label>
                <div className="rating-input">
                    {[1, 2, 3, 4, 5].map(star => (
                    <FaStar
                        key={star}
                        className={`star ${star <= newFeedback.rating ? 'filled' : ''}`}
                        onClick={() => handleRatingChange(star)}
                    />
                    ))}
                </div>
                </div>
                <div className="form-group">
                <label>Feedback Type</label>
                <div className="type-selector">
                    <button
                    type="button"
                    className={`type-btn ${newFeedback.type === 'compliment' ? 'active' : ''}`}
                    onClick={() => setNewFeedback({...newFeedback, type: 'compliment'})}
                    >
                    <FaThumbsUp className="icon" />
                    Compliment
                    </button>
                    <button
                    type="button"
                    className={`type-btn ${newFeedback.type === 'suggestion' ? 'active' : ''}`}
                    onClick={() => setNewFeedback({...newFeedback, type: 'suggestion'})}
                    >
                    <FaComment className="icon" />
                    Suggestion
                    </button>
                    <button
                    type="button"
                    className={`type-btn ${newFeedback.type === 'complaint' ? 'active' : ''}`}
                    onClick={() => setNewFeedback({...newFeedback, type: 'complaint'})}
                    >
                    <FaThumbsDown className="icon" />
                    Complaint
                    </button>
                </div>
                </div>
                <div className="form-group">
                <label>Your Feedback *</label>
                <textarea
                    name="message"
                    value={newFeedback.message}
                    onChange={handleInputChange}
                    required
                />
                </div>
                <button type="submit" className="submit-btn">
                Submit Feedback
                </button>
            </form>
            </div>
        )}

        {selectedFeedback && (
            <div className="feedback-modal">
            <div className="modal-content">
                <button 
                className="close-btn"
                onClick={() => setSelectedFeedback(null)}
                >
                &times;
                </button>
                <div className="feedback-details">
                <div className="feedback-header">
                    <h3>
                    <FaUser className="icon" />
                    {selectedFeedback.name}
                    {selectedFeedback.email && (
                        <span className="feedback-email"> ({selectedFeedback.email})</span>
                    )}
                    </h3>
                    <div className="feedback-meta">
                    <span className="feedback-date">
                        <FaCalendarAlt className="icon" />
                        {selectedFeedback.date}
                    </span>
                    <span className={`feedback-type ${selectedFeedback.type}`}>
                        {selectedFeedback.type.charAt(0).toUpperCase() + selectedFeedback.type.slice(1)}
                    </span>
                    </div>
                </div>
                <div className="feedback-rating">
                    {[...Array(5)].map((_, i) => (
                    <FaStar 
                        key={i} 
                        className={`star ${i < selectedFeedback.rating ? 'filled' : ''}`}
                    />
                    ))}
                </div>
                <div className="feedback-message">
                    <p>{selectedFeedback.message}</p>
                </div>
                
                {selectedFeedback.response ? (
                    <div className="feedback-response">
                    <h4>
                        <FaReply className="icon" />
                        Our Response
                    </h4>
                    <p>{selectedFeedback.response}</p>
                    </div>
                ) : (
                    <form onSubmit={handleResponseSubmit} className="response-form">
                    <h4>
                        <FaReply className="icon" />
                        Add Response
                    </h4>
                    <textarea
                        name="response"
                        placeholder="Type your response here..."
                        required
                    />
                    <div className="form-actions">
                        <button type="submit" className="submit-btn">
                        Send Response
                        </button>
                        <button
                        type="button"
                        className="status-btn resolved"
                        onClick={() => handleStatusChange(selectedFeedback.id, 'resolved')}
                        >
                        Mark as Resolved
                        </button>
                    </div>
                    </form>
                )}
                </div>
            </div>
            </div>
        )}
        </div>
    );
    };

    export default Feedback;