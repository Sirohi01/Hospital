import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import PatientRegistration from "../src/components/PatientRegistration";
import AppointmentScheduling from "../src/components/AppointmentScheduling";
import Billing from "../src/components/Billing";
import LaboratoryManagement from './components/LaboratoryManagement';
import '../src/index.css';
import PharmacyManagement from './components/PharmacyManagement';
import RFIDManagement from './components/RFIDManagement';
import Dashboard from './components/Dashboard';
import AmbulanceManagement from './components/AmbulanceManagement';
import BloodBankManagement from './components/BloodBankManagement';
import CanteenManagement from './components/CanteenManagement';
import FeedbackManagement from './components/FeedbackManagement';
import AttendanceManagement from './components/AttandanceManagement';
import DietaryManagement from './components/DietaryManagement';
import NurseStation from './components/NurseStation';
import OperationTheatre from './components/OperationTheatre';
import EquipmentMaintenance from "./components/EquipmentMaintenance";
import AssetsManagement from './components/AssetsManagement';
import { FaTint,FaHome, FaUserPlus, FaCalendarAlt, FaFileInvoiceDollar, FaFlask, FaPills, FaIdCard, FaAmbulance, FaComment, FaDAndD, FaUserNurse, FaNutritionix, FaServer, FaAssistiveListeningSystems } from 'react-icons/fa';
import { FaA, FaAccessibleIcon, FaBandage, FaBookMedical, FaBowlFood } from 'react-icons/fa6';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/patient-registration" element={<PatientRegistration />} />
              <Route path="/appointments" element={<AppointmentScheduling />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/laboratory" element={<LaboratoryManagement />} />
              <Route path="/pharmacy" element={<PharmacyManagement />} />
              <Route path="/rfid" element={<RFIDManagement />} />
              <Route path='/Ambulance' element={<AmbulanceManagement/>}/>
              <Route path='/Blood' element={<BloodBankManagement/>}/>
              <Route path='/Canteen' element={<CanteenManagement/>}/>
              <Route path='/Feedback' element={<FeedbackManagement/>}/>
              <Route path='/Attandance' element={<AttendanceManagement/>}/>
              <Route path='/Diet' element={<DietaryManagement/>}/>
              <Route path='/Nurse' element={<NurseStation/>}/>
              <Route path='/Operation' element={<OperationTheatre/>}/>
              <Route path='/Equipment' element={<EquipmentMaintenance/>}/>
              <Route path='/Assets' element={<AssetsManagement/>}/>
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

function Sidebar() {
  const location = useLocation();
  
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Sirohi Hospital</h2>
        <p>Management System</p>
      </div>
      <nav>
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
          <FaHome className="nav-icon" /> Dashboard
        </Link>
        <Link to="/patient-registration" className={`nav-link ${location.pathname === '/patient-registration' ? 'active' : ''}`}>
          <FaUserPlus className="nav-icon" /> Patient Registration
        </Link>
        <Link to="/appointments" className={`nav-link ${location.pathname === '/appointments' ? 'active' : ''}`}>
          <FaCalendarAlt className="nav-icon" /> Appointments
        </Link>
        <Link to="/billing" className={`nav-link ${location.pathname === '/billing' ? 'active' : ''}`}>
          <FaFileInvoiceDollar className="nav-icon" /> Billing
        </Link>
        <Link to="/laboratory" className={`nav-link ${location.pathname === '/laboratory' ? 'active' : ''}`}>
          <FaFlask className="nav-icon" /> Laboratory
        </Link>
        <Link to="/pharmacy" className={`nav-link ${location.pathname === '/pharmacy' ? 'active' : ''}`}>
          <FaPills className="nav-icon" /> Pharmacy
        </Link>
        <Link to="/rfid" className={`nav-link ${location.pathname === '/rfid' ? 'active' : ''}`}>
          <FaIdCard className="nav-icon" /> RFID
        </Link>
        <Link to="/Ambulance" className={`nav-link ${location.pathname === '/Ambulance' ? 'active' : ''}`}>
          <FaAmbulance className="nav-icon" /> Ambulance
        </Link>
        <Link to="/Blood" className={`nav-link ${location.pathname === '/Blood' ? 'active' : ''}`}>
          <FaTint className="nav-icon" /> Blood Bank
        </Link>
        <Link to="/Canteen" className={`nav-link ${location.pathname === '/Canteen' ? 'active' : ''}`}>
          <FaBowlFood className="nav-icon" /> Canteen
        </Link>
        <Link to="/Feedback" className={`nav-link ${location.pathname === '/Feedback' ? 'active' : ''}`}>
          <FaComment className="nav-icon" /> Feedback
        </Link>
        <Link to="/Attandance" className={`nav-link ${location.pathname === '/Attandance' ? 'active' : ''}`}>
          <FaAccessibleIcon className="nav-icon" /> Attendance
        </Link>
        <Link to="/Diet" className={`nav-link ${location.pathname === '/Diet' ? 'active' : ''}`}>
          <FaNutritionix className="nav-icon" /> Dietary
        </Link>
        <Link to="/Nurse" className={`nav-link ${location.pathname === '/Nurse' ? 'active' : ''}`}>
          <FaUserNurse className="nav-icon" /> Nurse
        </Link>
        <Link to="/Operation" className={`nav-link ${location.pathname === '/Operation' ? 'active' : ''}`}>
          <FaBookMedical className="nav-icon" /> Operation Theatre
        </Link>
        <Link to="/Equipment" className={`nav-link ${location.pathname === '/Equipment' ? 'active' : ''}`}>
          <FaServer className="nav-icon" /> Equipment Maintenance
        </Link>
        <Link to="/Assets" className={`nav-link ${location.pathname === '/Assets' ? 'active' : ''}`}>
          <FaAssistiveListeningSystems className="nav-icon" /> Assets Management
        </Link>
      </nav>
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">AD</div>
          <div className="user-info">
            <p className="username">Admin User</p>
            <p className="role">System Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>Sirohi Hospital Dashboard</h1>
      <div className="header-actions">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button><i className="fas fa-search"></i></button>
        </div>
      </div>
    </header>
  );
}

export default App;