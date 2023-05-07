import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


export default function Login(props) {
    const {setUser, closeModal, setShowLogin, event} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [error, setError] = useState(null);
    const handleLogin = async (ev) => {
        ev.preventDefault();
        const headers = {
            'Content-Type': 'application/json'
        };
        const data = {
            email: email,
            password: password
        };
        const url = process.env.REACT_APP_SERVER_URL + '/user/login';
        try {
            const res = await axios.post(url, data, {headers});
            const isParticipantPresent = event.participants.some(
                (participant) => participant === res.data._id
            );

            if (!isParticipantPresent) {
                setUser(res.data);
            } else {
                window.alert("User already registered");
                closeModal();
            }
        } catch (e) {
            setError(e.response.data.error);
        }
    }

    const handleForgotPassword = async event => {
        event.preventDefault();
        const headers = {
            'Content-Type': 'application/json'
        };
        const data = {
            email: email,
        };
        const url = process.env.REACT_APP_SERVER_URL + '/user/forgot_password';
        console.log("Here")
        try {
            const res = await axios.post(url, data, {headers});
            setError(res.data.message);
            setShowForgotPassword(false);
            console.log(res);
        } catch (e) {
            console.log(e);
            setError(e);
        }

    }

    return (
        <>
            <div className="topBar">
                <FontAwesomeIcon className="topIcon" icon={faChevronLeft} onClick={closeModal}/>
                <h2>{(showForgotPassword) ? 'Forgot Password' : 'Login'}</h2>
            </div>
            <div className="parent">
                {
                    showForgotPassword ?
                        <>
                            <form onSubmit={handleForgotPassword}>
                                <div className="form-group">
                                <div className="dataDetails">
                                You'll receive password on your registered mail.
                            </div>
                                    <input type="email" id="email" value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                           placeholder="Email Address" style={{marginTop:'20px'}}/>
                                </div>
                                <div className="button-container">
                                    <button type="submit" style={{textTransform:'none'}}>Submit</button>
                                </div>
                            </form>
                        </>
                        :
                        <>
                            <form onSubmit={handleLogin} style={{marginTop:'20px'}}>
                                <div className="form-group">
                                    <input type="email" id="email" value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                           placeholder="Email Address"/>
                                </div>
                                <div className="form-group">
                                    <input type="password" id="password" value={password}
                                           onChange={(e) => setPassword(e.target.value)}
                                           placeholder="Password"/>
                                </div>
                                <div style={{margin:'0 20px 20px 20px', fontSize:'15px', color:'firebrick'}}>{error}</div>
                                <div className="button-container">
                                    <button type="submit">Login</button>
                                </div>
                                <div style={{margin:'10px 20px 20px 20px'}}>
                                    <a onClick={() => setShowForgotPassword(true)} style={{textDecoration:'underline', marginLeft:'7px'}}>
                                    Forgot your password? 
                                    </a>
                                </div>
                                {/* <div>Not a user?<a onClick={() => setShowLogin(false)}>Register here</a></div> */}
                                {/*<div className='privacy'>*/}
                                {/*    By agreeing to our <a*/}
                                {/*    href="https://github.com/WeFolks/FolksPrivacy/blob/main/privacy-policy.md">*/}
                                {/*    Privacy*/}
                                {/*    Policy</a>, you are helping us maintain a secure and trustworthy*/}
                                {/*    platform for all*/}
                                {/*    our*/}
                                {/*    users.*/}
                                {/*</div>*/}
                            </form>
                        </>
                }
            </div>
        </>
    )
}
