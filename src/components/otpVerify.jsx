import React, { useState, useRef } from 'react';
import '../assets/css/otpInput.css';
import BillingPage from './billingPage.jsx';

export default function OtpInput(props) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpBoxes = useRef([]);
  const [showBill, setShowBill] = useState(false);
  const [totalTicketPrice, setTotalTicketPrice] = useState(0);

  const handleChange = (event, index) => {
    const input = event.target.value;
    if (isNaN(input)) return;

    const newOtp = [...otp];
    newOtp[index] = input;
    setOtp(newOtp);

    if (index === 5) {
    //   props.onSuccess(newOtp.join(''));
    } else if (input !== '') {
      otpBoxes.current[index + 1].focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && index !== 0 && otp[index] === '') {
      otpBoxes.current[index - 1].focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    // props.onSuccess(code);
    setShowBill(true);
    setTotalTicketPrice(100); // Set the ticket price here
  };

  return (
    showBill ? (
      <BillingPage totalTicketPrice={totalTicketPrice} />
    ) : (<div className="otpInput">
      <div className="otpBoxes">
        <input
          type="text"
          maxLength="1"
          ref={(el) => otpBoxes.current[0] = el}
          onChange={(e) => handleChange(e, 0)}
          onKeyDown={(e) => handleKeyDown(e, 0)}
          value={otp[0]}
        />
        <input
          type="text"
          maxLength="1"
          ref={(el) => otpBoxes.current[1] = el}
          onChange={(e) => handleChange(e, 1)}
          onKeyDown={(e) => handleKeyDown(e, 1)}
          value={otp[1]}
        />
        <input
          type="text"
          maxLength="1"
          ref={(el) => otpBoxes.current[2] = el}
          onChange={(e) => handleChange(e, 2)}
          onKeyDown={(e) => handleKeyDown(e, 2)}
          value={otp[2]}
        />
        <input
          type="text"
          maxLength="1"
          ref={(el) => otpBoxes.current[3] = el}
          onChange={(e) => handleChange(e, 3)}
          onKeyDown={(e) => handleKeyDown(e, 3)}
          value={otp[3]}
        />
        <input
          type="text"
          maxLength="1"
          ref={(el) => otpBoxes.current[4] = el}
          onChange={(e) => handleChange(e, 4)}
          onKeyDown={(e) => handleKeyDown(e, 4)}
          value={otp[4]}
        />
        <input
          type="text"
          maxLength="1"
          ref={(el) => otpBoxes.current[5] = el}
          onChange={(e) => handleChange(e, 5)}
          onKeyDown={(e) => handleKeyDown(e, 5)}
          value={otp[5]}
        />
      </div>
      <button className="verifyButton" onClick={handleVerify}>
        Verify
      </button>
    </div>)
  );
}
