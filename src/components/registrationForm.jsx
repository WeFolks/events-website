import React, {useState} from 'react';
import PropTypes from 'prop-types';
import '../assets/css/RegistrationForm.css';
import Login from "./Login";
import Register from "./Register";
import BillingPage from "./billingPage";

const RegistrationForm = ({isModalOpen = false, closeModal, event}) => {
    const [showLogin, setShowLogin] = useState(false);
    const [user, setUser] = useState(null);

    return (

        (<div className={isModalOpen ? 'registration-form open' : 'registration-form'}>

            <div className="modal-content">
                {
                    (user)
                        ?
                        (
                            <BillingPage user={user} event={event} closeModal={closeModal}/>
                        )
                        :
                        (
                            showLogin ?
                                <Login
                                    setUser={setUser}
                                    setShowLogin={setShowLogin}
                                    closeModal={closeModal}
                                    event={event}
                                />
                                :
                                <Register
                                    setShowLogin={setShowLogin}
                                    closeModal={closeModal}
                                    setUser={setUser}
                                    event={event}
                                />
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
