import React, {useState, useRef, useEffect} from 'react';
import '../assets/css/otpInput.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth';
import '../utils/firebaseConfig';


export default function OtpInput(props) {
    const {setUser, firstName, lastName, phoneNo, email, password, event, closeModal} = props;
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const otpBoxes = useRef([]);
    const [confirmationResult, setConfirmationResult] = useState(null); // Add this state variable
    const auth = getAuth();
    const phoneNumber = props.phoneNo;
    const [error, setError] = useState(null);


    const signUp = async (user) => {
        try {
            const url = process.env.REACT_APP_SERVER_URL + '/user/sign_up/easy';
            const response = await axios.post(url, user);

            const isParticipantPresent = event.participants.some(
                (participant) => participant === response.data._id
            );

            if (!isParticipantPresent) {
                setUser(response.data);
            } else {
                window.alert("User already registered");
                closeModal();
            }
            setUser(response.data);
        } catch (error) {
            if (error.response) {
                // window.alert('SignUp failed:', error.response.data.error);
                setError(error.response.data.error);
            } else {
                window.alert('Error:', error.message);
            }
        }
    };

    const sendOTP = (recaptchaVerifier) => {
        signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
            .then((result) => {
                setConfirmationResult(result);
            })
            .catch((error) => {
                window.alert('Error sending OTP:', error);
            });
    };

    useEffect(() => {
        const auth = getAuth();
        const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            size: 'invisible',
        }, auth);
        sendOTP(recaptchaVerifier);
    }, []);

    const resendOTP = () => {
        const auth = getAuth();
        const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            size: 'invisible',
        }, auth);
        sendOTP(recaptchaVerifier);
    };

    const handleChange = (event, index) => {
        const input = event.target.value;
        if (isNaN(input)) return;

        const newOtp = [...otp];
        newOtp[index] = input;
        setOtp(newOtp);

        if (index === 5) {
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
        if (confirmationResult) {
            confirmationResult.confirm(code)
                .then((result) => {
                    const user = {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        phoneNo: phoneNo,
                        password: password
                    }
                    signUp(user)
                        .catch(e => console.error(e))
                })
                .catch((error) => {
                    window.alert('OTP verification failed:', error.message);
                });
        } else {
            window.alert('No confirmation result found');
        }
    };

    return (
        <div className="otpInput">
            <div style={{marginBottom: '20px', fontSize: '15px', color: 'firebrick'}}>{error}</div>
            <div className="otpBoxes" id='otpBox'>
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
            <div id="recaptcha-container"></div>
            <div className="resendOTP">
                Didn't receive OTP? <button className="resendOTPButton" onClick={resendOTP}>
                Resend
            </button>
            </div>
            <button className="verifyButton" onClick={handleVerify}>
                Verify OTP
            </button>
        </div>
    )

}

OtpInput.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phoneNo: PropTypes.string,
    password: PropTypes.string,
    event: PropTypes.object,
};
