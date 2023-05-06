import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


export default function Login(props) {
    const {setUser, closeModal, setShowLogin} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = (event) => {
        event.preventDefault();
        const headers = {
            'Content-Type': 'application/json'
        };
        const data = {
            email: 'r@f.com',
            password: 'abc12345'
        };
        const url = process.env.REACT_APP_SERVER_URL + '/user/login';
        console.log("Here")
        axios
            .post(url, data, {headers})
            .then(response => {
                console.log(response.data);
                setUser(response.data);
            })
            .catch(error => console.error(error));
    }

    return (
        <>
            <div className="topBar">
                <FontAwesomeIcon className="topIcon" icon={faChevronLeft} onClick={closeModal}/>
            </div>
            <div className="parent">
                <div className="dataDetails">
                    We're excited to see you in our event!<br></br> Please login to register for event. <br></br>
                </div>
                <form onSubmit={handleLogin}>
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
                    <div className="button-container">
                        <button type="submit">Login</button>
                    </div>
                    {/*<div>Can't remember your password?<a>click here</a></div>*/}
                    {/*<div>Not a user?<a onClick={() => setShowLogin(false)}>Register here</a></div>*/}
                    <div className='privacy'>
                        By agreeing to our <a
                        href="https://github.com/WeFolks/FolksPrivacy/blob/main/privacy-policy.md">
                        Privacy
                        Policy</a>, you are helping us maintain a secure and trustworthy
                        platform for all
                        our
                        users.
                    </div>
                </form>
            </div>
        </>
    )
}
