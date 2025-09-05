    import React, { useState } from 'react';
    import { 
    FaCalendarCheck, 
    FaUser, 
    FaUserMd, 
    FaClock, 
    FaInfoCircle,
    FaSearch,
    FaCalendarAlt
    } from 'react-icons/fa';
    import { MdDateRange } from 'react-icons/md';
    import '../styles/AppointmentScheduling.css';

    function AppointmentScheduling() {
    const [formData, setFormData] = useState({
        patientName: '',
        doctorName: '',
        appointmentDate: '',
        timeSlot: '',
        reason: '',
        phoneNumber: ''
    });

    const [activeTab, setActiveTab] = useState('schedule');
    const [searchTerm, setSearchTerm] = useState('');
    const [appointments, setAppointments] = useState([
        {
        id: 1,
        patientName: 'Vivek Chauhan',
        doctorName: 'Dr. Taruna Sirohi',
        date: '2023-06-15',
        time: '10:00 AM - 11:00 AM',
        status: 'confirmed'
        },
        {
        id: 2,
        patientName: 'Nikit Chaudhary',
        doctorName: 'Dr. Manish Sirohi',
        date: '2023-06-16',
        time: '2:00 PM - 3:00 PM',
        status: 'pending'
        }
    ]);

    const doctors = [
        { id: 1, name: 'Dr. Manish Sirohi', specialty: 'Cardiology' },
        { id: 2, name: 'Dr. Taruna Sirohi', specialty: 'Neurology' },
        { id: 3, name: 'Dr. Akanksha Sirohi', specialty: 'Pediatrics' },
        { id: 4, name: 'Dr. Sohil Sirohi', specialty: 'Orthopedics' }
    ];

    const timeSlots = [
        '9:00 AM - 10:00 AM',
        '10:00 AM - 11:00 AM',
        '11:00 AM - 12:00 PM',
        '1:00 PM - 2:00 PM',
        '2:00 PM - 3:00 PM',
        '3:00 PM - 4:00 PM'
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAppointment = {
        id: appointments.length + 1,
        patientName: formData.patientName,
        doctorName: formData.doctorName,
        date: formData.appointmentDate,
        time: formData.timeSlot,
        status: 'confirmed'
        };
        
        setAppointments([...appointments, newAppointment]);
        alert('Appointment Scheduled Successfully!');
        setFormData({ 
        patientName: '', 
        doctorName: '', 
        appointmentDate: '', 
        timeSlot: '',
        reason: '',
        phoneNumber: ''
        });
    };

    const filteredDoctors = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredAppointments = appointments.filter(appointment =>
        appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const cancelAppointment = (id) => {
        setAppointments(appointments.filter(appointment => appointment.id !== id));
    };

    return (
        <div className="appointment-container">
        <div className="appointment-header">
            <h2><FaCalendarCheck /> Appointment Management</h2>
            <div className="tabs">
            <button 
                className={activeTab === 'schedule' ? 'active' : ''}
                onClick={() => setActiveTab('schedule')}
            >
                Schedule Appointment
            </button>
            <button 
                className={activeTab === 'view' ? 'active' : ''}
                onClick={() => setActiveTab('view')}
            >
                View Appointments
            </button>
            </div>
        </div>

        {activeTab === 'schedule' ? (
            <div className="schedule-section">
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label><FaUser /> Patient Name</label>
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
                    <label><FaUserMd /> Doctor</label>
                    <select
                    name="doctorName"
                    value={formData.doctorName}
                    onChange={handleChange}
                    required
                    >
                    <option value="">Select Doctor</option>
                    {doctors.map(doctor => (
                        <option key={doctor.id} value={doctor.name}>
                        {doctor.name} ({doctor.specialty})
                        </option>
                    ))}
                    </select>
                </div>

                <div className="form-group">
                    <label><MdDateRange /> Date</label>
                    <input
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    />
                </div>

                <div className="form-group">
                    <label><FaClock /> Time Slot</label>
                    <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    required
                    >
                    <option value="">Select Time Slot</option>
                    {timeSlots.map((slot, index) => (
                        <option key={index} value={slot}>{slot}</option>
                    ))}
                    </select>
                </div>

                <div className="form-group">
                    <label><FaInfoCircle /> Reason for Visit</label>
                    <textarea
                    name="reason"
                    placeholder="Briefly describe the reason for appointment"
                    value={formData.reason}
                    onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Patient phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    />
                </div>

                <button type="submit" className="submit-btn">
                    Schedule Appointment
                </button>
                </form>
            </div>

            <div className="doctor-info">
                <h3>Available Doctors</h3>
                <div className="search-box">
                <FaSearch />
                <input
                    type="text"
                    placeholder="Search doctors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                </div>
                <div className="doctors-list">
                {filteredDoctors.map(doctor => (
                    <div key={doctor.id} className="doctor-card">
                    <div className="doctor-avatar">
                        {doctor.name.charAt(0)}
                    </div>
                    <div className="doctor-details">
                        <h4>{doctor.name}</h4>
                        <p>{doctor.specialty}</p>
                        <div className="availability">
                        <span>Available Today</span>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            </div>
        ) : (
            <div className="view-section">
            <div className="appointments-header">
                <h3>Upcoming Appointments</h3>
                <div className="search-box">
                <FaSearch />
                <input
                    type="text"
                    placeholder="Search appointments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                </div>
            </div>

            <div className="appointments-list">
                {filteredAppointments.length > 0 ? (
                filteredAppointments.map(appointment => (
                    <div key={appointment.id} className="appointment-card">
                    <div className="appointment-date">
                        <FaCalendarAlt />
                        <div>
                        <p>{new Date(appointment.date).toDateString()}</p>
                        <p>{appointment.time}</p>
                        </div>
                    </div>
                    <div className="appointment-details">
                        <h4>{appointment.patientName}</h4>
                        <p>With {appointment.doctorName}</p>
                        <span className={`status ${appointment.status}`}>
                        {appointment.status}
                        </span>
                    </div>
                    <div className="appointment-actions">
                        <button className="edit-btn">Reschedule</button>
                        <button 
                        className="cancel-btn"
                        onClick={() => cancelAppointment(appointment.id)}
                        >
                        Cancel
                        </button>
                    </div>
                    </div>
                ))
                ) : (
                <div className="no-appointments">
                    <p>No appointments found</p>
                </div>
                )}
            </div>
            </div>
        )}
        </div>
    );
    }

    export default AppointmentScheduling;