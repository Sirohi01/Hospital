    import React, { useState } from 'react';
    import '../styles/Billing.css';
    import { FaCreditCard, FaPrint, FaEdit, FaFileInvoiceDollar } from 'react-icons/fa';

    function Billing() {
    const [formData, setFormData] = useState({
        patientName: '',
        service: '',
        amount: '',
        paymentMethod: '',
    });

    // Sample billing history data
    const [billingHistory, setBillingHistory] = useState([
        {
        id: 1,
        patientName: 'John Doe',
        service: 'Dental Checkup',
        amount: '150.00',
        date: '2023-05-15',
        status: 'paid'
        },
        {
        id: 2,
        patientName: 'Jane Smith',
        service: 'Blood Test',
        amount: '75.50',
        date: '2023-05-10',
        status: 'pending'
        },
        {
        id: 3,
        patientName: 'Robert Johnson',
        service: 'Physical Examination',
        amount: '200.00',
        date: '2023-05-05',
        status: 'paid'
        }
    ]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBill = {
        id: billingHistory.length + 1,
        patientName: formData.patientName,
        service: formData.service,
        amount: formData.amount,
        date: new Date().toISOString().split('T')[0],
        status: 'paid'
        };
        
        setBillingHistory([newBill, ...billingHistory]);
        console.log('Billing Information:', formData);
        alert('Billing Processed Successfully!');
        setFormData({ patientName: '', service: '', amount: '', paymentMethod: '' });
    };

    return (
        <div className="billing-container">
        <div className="billing-header">
            <h2><FaCreditCard /> Billing</h2>
        </div>
        
        <div className="billing-form">
            <div className="billing-form-container">
            <h3>Create New Bill</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label>Patient Name</label>
                <input
                    type="text"
                    name="patientName"
                    placeholder="Patient Name"
                    value={formData.patientName}
                    onChange={handleChange}
                    required
                />
                </div>
                
                <div className="form-group">
                <label>Service Provided</label>
                <input
                    type="text"
                    name="service"
                    placeholder="Service Provided"
                    value={formData.service}
                    onChange={handleChange}
                    required
                />
                </div>
                
                <div className="form-group">
                <label>Amount</label>
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />
                </div>
                
                <div className="form-group">
                <label>Payment Method</label>
                <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Payment Method</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Cash">Cash</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                </select>
                </div>
                
                <button type="submit" className="submit-btn">Process Payment</button>
            </form>
            </div>
            
            <div className="billing-history">
            <h3>Billing History</h3>
            {billingHistory.length > 0 ? (
                <div className="billing-list">
                {billingHistory.map(bill => (
                    <div key={bill.id} className="billing-card">
                    <div className="billing-info">
                        <div className="billing-icon">
                        <FaFileInvoiceDollar />
                        </div>
                        <div className="billing-details">
                        <h4>{bill.patientName}</h4>
                        <p>{bill.service} • {bill.date}</p>
                        <span className={`billing-status ${bill.status}`}>
                            {bill.status}
                        </span>
                        </div>
                    </div>
                    <div className="billing-amount">
                        ${bill.amount}
                    </div>
                    <div className="billing-actions">
                        <button className="print-btn">
                        <FaPrint /> Print
                        </button>
                        <button className="edit-btn">
                        <FaEdit /> Edit
                        </button>
                    </div>
                    </div>
                ))}
                </div>
            ) : (
                <div className="no-bills">No billing records found</div>
            )}
            </div>
            
            <div className="payment-summary">
            <h3>Payment Summary</h3>
            <div className="summary-row">
                <span>Total Paid:</span>
                <span>$425.50</span>
            </div>
            <div className="summary-row">
                <span>Pending Payments:</span>
                <span>$75.50</span>
            </div>
            <div className="summary-row">
                <span>Total Revenue:</span>
                <span>$501.00</span>
            </div>
            </div>
        </div>
        </div>
    );
    }

    export default Billing;