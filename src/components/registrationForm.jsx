import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../assets/css/RegistrationForm.css';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = ({ isModalOpen, closeModal }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form inputs
    if (!fullName || !email || !mobileNumber || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // If the form is valid, redirect to the OTP verification page
    navigate('/verify-otp');
    closeModal();
  }

  return (
    <div className={isModalOpen ? 'registration-form open' : 'registration-form'}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Quick Booking</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="full-name">Full Name</label>
            <input type="text" id="full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="mobile-number">Mobile Number</label>
            <input type="tel" id="mobile-number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <div className="button-container">
            <button type="submit">Proceed</button>
          </div>
        </form>
      </div>
    </div>
  );
}

RegistrationForm.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default RegistrationForm;
