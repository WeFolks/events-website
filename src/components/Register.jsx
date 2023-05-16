import React, {useState} from "react";
import OtpInput from "./otpVerify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";

export default function Register(props) {
    const {setShowLogin, closeModal, setUser, event} = props
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showOTP, setShowOTP] = useState(false);

    function formatPhoneNumber(phoneNumber) {
        // Remove all non-numeric characters from the phone number
        const numericPhoneNumber = phoneNumber.replace(/\D/g, '');
        // Check if the phone number starts with '0' or '+91'
        if (numericPhoneNumber.startsWith('0')) {
            // If it starts with '0', it is a landline number and cannot be formatted correctly
            return phoneNumber;
        } else if (numericPhoneNumber.startsWith('91')) {
            // If it starts with '+91', remove the '+' sign and return the rest of the digits
            return '+91' + numericPhoneNumber.slice(2);
        } else {
            // Otherwise, assume it's a 10-digit mobile number and format it as '+91xxxxxxxxxx'
            return '+91' + numericPhoneNumber;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate the form inputs
        if (!fullName || !email || !mobileNumber || !password) {
            alert('Please fill in all fields');
            return;
        }

        setShowOTP(true);
    }

    return (
        <>
            <div className="topBar">
                <FontAwesomeIcon className="topIcon" icon={faChevronLeft} onClick={closeModal}/>
                <h2>{(showOTP) ? 'Verify Mobile Number' : 'User Details'}</h2>
            </div>
            {
                showOTP
                    ?
                    (
                        <>
                            <OtpInput
                                firstName={fullName.trim().split(' ')[0]}
                                lastName={
                                    fullName.trim().split(' ').length > 1
                                        ?
                                        fullName.trim().split(' ').slice(1).join(' ')
                                        :
                                        ""
                                }
                                phoneNo={formatPhoneNumber(mobileNumber)}
                                email={email}
                                password={password}
                                setUser={setUser}
                                event={event}
                            />
                        </>
                    )
                    :
                    (
                        <div className="parent">
                            <div className="dataDetails">
                                We're excited to see you in our event!<br></br> Please fill the form to
                                receive
                                registration
                                confirmation.
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input type="text" id="full-name" value={fullName}
                                           onChange={(e) => setFullName(e.target.value)}
                                           placeholder="Full Name"/>
                                </div>
                                <div className="form-group">
                                    <input type="email" id="email" value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                           placeholder="Email Address"/>
                                </div>
                                <div className="form-group">
                                    <input type="tel" id="mobile-number" value={mobileNumber}
                                           onChange={(e) => setMobileNumber(e.target.value)}
                                           placeholder="Mobile Number"/>
                                </div>
                                <div className="form-group">
                                    <input type="password" id="password" value={password}
                                           onChange={(e) => setPassword(e.target.value)}
                                           placeholder="Password"/>
                                </div>
                                <div className="button-container">
                                    <button type="submit">Proceed</button>
                                </div>

                                <div style={{marginBottom: '10px'}}>Or</div>
                                <div style={{marginBottom: '10px'}}>Already a user? <a href={"#"} onClick={() => {
                                    setShowLogin(true)
                                }} style={{textDecoration: 'underline'}}>Login</a></div>
                                <div className='privacy'>
                                    By agreeing to our <a
                                    href=
                                        "https://github.com/WeFolks/FolksPrivacy/blob/main/privacy-policy.md">Privacy
                                    Policy</a>, you are helping us maintain a secure and trustworthy
                                    platform for all
                                    our
                                    users.
                                </div>
                            </form>
                        </div>
                    )
            }
        </>
    )

}
