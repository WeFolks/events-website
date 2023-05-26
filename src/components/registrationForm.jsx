import React, {useState} from 'react';
import PropTypes from 'prop-types';
import '../assets/css/RegistrationForm.css';
import Login from "./Login";
import Register from "./Register";
import BillingPage from "./billingPage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";

const RegistrationForm = ({isModalOpen = false, closeModal, event}) => {
    const [user, setUser] = useState(null);
    const [formState, setFormState] = useState(2);

    return (

        (<div className={isModalOpen ? 'registration-form open' : 'registration-form'}>
<div className="modal-overlay" onClick={closeModal}></div>
            <div className="modal-content">
                {
                    (user)
                        ?
                        (
                            <BillingPage user={user} event={event} closeModal={closeModal}/>
                        )
                        :
                        (
                            formState === 0 ? (
                                <Login
                                    setUser={setUser}
                                    // setShowLogin={setShowLogin}
                                    closeModal={closeModal}
                                    event={event}
                                    setFormState={setFormState}
                                />
                            ) : (
                                formState === 1 ? (
                                    <Register
                                        // setShowLogin={setShowLogin}
                                        closeModal={closeModal}
                                        setUser={setUser}
                                        event={event}
                                        setFormState={setFormState}
                                    />
                                ) : (
                                    <div className='appRedirect'>
                                      <div className="topBar">
                <FontAwesomeIcon className="topIcon" icon={faChevronLeft} onClick={closeModal}/>
                <h2>{'Welcome to Folks'}</h2>
            </div>
            <div className="redirectMain" >
            <span style={{fontWeight:'700'}}> Book using mobile app and pay zero Platform Fee for all activities!</span>
            <a href="https://play.google.com/store/apps/details?id=com.folks.folks_project" target='_blank' rel="noopener noreferrer">
                        <button style={{ textDecoration: 'none', background: 0, border: 'hidden' }}>
                        <div className="downloadApp" style={{margin:'10px' , position:'inherit', top:'15px', right:'20px', padding:'10px', backgroundColor:"white", color:"#ff7958"}}>
                            Download App
                        </div>
                        </button>
                    </a>
                    <br />
                    <br />
                    Or
                    <br />
                    <br />
            <a onClick={()=>setFormState(1)} href=''> Proceed with website registration</a>
            </div>
                                    </div>
                                )
                            )
                        )
                }
            </div>
        </div>)
    );
}

RegistrationForm.propTypes = {
    isModalOpen: PropTypes.bool,
    closeModal: PropTypes.func.isRequired
};

export default RegistrationForm;
