import React from 'react';
import { FaUsers, FaCalendarCheck, FaMoneyBillWave, FaFlask, FaPills, FaIdCard } from 'react-icons/fa';

function Dashboard() {
  // Sample data
  const stats = [
    { title: 'Total Patients', value: '1,245', icon: <FaUsers />, color: 'bg-blue-100 text-blue-600' },
    { title: 'Today\'s Appointments', value: '42', icon: <FaCalendarCheck />, color: 'bg-green-100 text-green-600' },
    { title: 'Revenue Today', value: '$12,845', icon: <FaMoneyBillWave />, color: 'bg-purple-100 text-purple-600' },
    { title: 'Lab Tests', value: '28', icon: <FaFlask />, color: 'bg-yellow-100 text-yellow-600' },
    { title: 'Prescriptions', value: '56', icon: <FaPills />, color: 'bg-red-100 text-red-600' },
    { title: 'RFID Tags', value: '892', icon: <FaIdCard />, color: 'bg-indigo-100 text-indigo-600' },
  ];

  const recentPatients = [
    { id: 1, name: 'Manish Chauhan', age: 32, gender: 'Male', contact: '555-123-4567', date: '2023-05-15' },
    { id: 2, name: 'Vivek Chauhan', age: 28, gender: 'Female', contact: '555-987-6543', date: '2023-05-14' },
    { id: 3, name: 'Rahul Khati', age: 45, gender: 'Male', contact: '555-456-7890', date: '2023-05-14' },
    { id: 4, name: 'Piyush Kumar', age: 36, gender: 'Female', contact: '555-789-0123', date: '2023-05-13' },
    { id: 5, name: 'Prashant kumar', age: 52, gender: 'Male', contact: '555-234-5678', date: '2023-05-12' },
  ];

  const upcomingAppointments = [
    { id: 1, patient: 'Mohit', doctor: 'Dr. Manish', time: '09:00 AM', date: 'Today', status: 'Confirmed' },
    { id: 2, patient: 'Surya', doctor: 'Dr. Taruna', time: '10:30 AM', date: 'Today', status: 'Confirmed' },
    { id: 3, patient: 'Omkar', doctor: 'Dr. Manish', time: '02:15 PM', date: 'Tomorrow', status: 'Pending' },
    { id: 4, patient: 'Jaypal', doctor: 'Dr. Akanksha', time: '11:00 AM', date: 'Tomorrow', status: 'Confirmed' },
    { id: 5, patient: 'Suryapal', doctor: 'Dr. Sohil', time: '03:45 PM', date: 'May 18', status: 'Pending' },
  ];

  return (
    <div className="dashboard">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.color} mr-4`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-xl font-bold">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Patients */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Recent Patients</h2>
            <div className="card-actions">
              <button className="btn btn-outline">View All</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Contact</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentPatients.map(patient => (
                  <tr key={patient.id}>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.contact}</td>
                    <td>{patient.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Upcoming Appointments */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Upcoming Appointments</h2>
            <div className="card-actions">
              <button className="btn btn-outline">View All</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Time</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {upcomingAppointments.map(appointment => (
                  <tr key={appointment.id}>
                    <td>{appointment.patient}</td>
                    <td>{appointment.doctor}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.date}</td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        appointment.status === 'Confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="card mt-6">
        <div className="card-header">
          <h2 className="card-title">Recent Activity</h2>
        </div>
        <div className="space-y-4">
          {[
            { id: 1, action: 'New patient registration', user: 'Dr. Manish', time: '10 minutes ago' },
            { id: 2, action: 'Lab test completed', user: 'Lab Technician', time: '25 minutes ago' },
            { id: 3, action: 'Prescription issued', user: 'Dr. Taruna', time: '1 hour ago' },
            { id: 4, action: 'Appointment scheduled', user: 'Reception', time: '2 hours ago' },
            { id: 5, action: 'Payment received', user: 'Billing Dept', time: '3 hours ago' },
          ].map(activity => (
            <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-full mr-3">
                <FaUsers className="text-sm" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-500">By {activity.user} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;