import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../assets/css/RegistrationForm.css';
import OtpInput from './otpVerify.jsx';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const RegistrationForm = ({ isModalOpen = false, closeModal }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showItems, setShowItems] = useState(false);

  var proceed = false;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form inputs
    if (!fullName || !email || !mobileNumber || !password ) {
      alert('Please fill in all fields');
      return;
    }
    // If the form is valid, redirect to the OTP verification page
    console.log("updateing screen");
    setShowItems(!showItems);
    // navigate('/verify-otp');
    // closeModal();
  }

  return (
    
    (<div className={isModalOpen ? 'registration-form open' : 'registration-form'}>
      
      <div className="modal-content">
        <div className="topBar">
      <FontAwesomeIcon class="topIcon" icon={faChevronLeft} onClick={closeModal} />
        <h2>{(showItems)?'Verify Mobile Number':'User Details'}</h2>
        </div>
        {(showItems)?(<OtpInput />):<div className="parent">
          <div className="dataDetails">
          We're excited to see you in our event!<br></br> Please fill the form to receive registration confirmation.
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
            <input type="text" id="full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" />
            </div>
            <div className="form-group">
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address"/>
            </div>
            <div className="form-group">
              <input type="tel" id="mobile-number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder="Mobile Number"/>
            </div>
            <div className="form-group">
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            </div>
            <div className="button-container">
              <button type="submit" >Proceed</button>
            </div>
            <div className='privacy'>
            By agreeing to our <a href="https://github.com/WeFolks/FolksPrivacy/blob/main/privacy-policy.md">Privacy Policy</a>, you are helping us maintain a secure and trustworthy platform for all our users. 
            </div>
          </form>
        </div>}
      </div>
    </div> )
  );
}

RegistrationForm.propTypes = {
  isModalOpen: PropTypes.bool,
  closeModal: PropTypes.func.isRequired
};

export default RegistrationForm;
