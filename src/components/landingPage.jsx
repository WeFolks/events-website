import React from 'react';
import '../assets/css/landingPage.css';
import Logo from "../assets/images/Logo.svg"
import Explore from "../assets/images/explore_new.png"

const LandingPage = () => {
  return (
    <div className="landing-page">
        <div className="main-col">
        <div className="left-col">

        <img src={Explore} alt=""/>
        </div>
        <div className="right-col">
            <div className="start">
                <h1>Welcome to <span style={{color:"#ff7958"}}>Folks</span> </h1>
                    <p>Explore more fun activities and event links through the App Now!</p>
                </div>
                <div className="features">
                <h2>Why Install Our App?</h2>
                <ul>
                    <li>Discover fun and exciting events in your locality</li>
                    <li>Stay connected with your favorite communities and people</li>
                    <li>Get regular updates on your followers' events</li>
                    <li>Track and showcase your activity to the world</li>
                    <li>Enjoy special discounts and much more!</li>
                </ul>
            </div>
        </div>
        </div>
        
      <div className="bottomNav">
        <div className="col" id="col1">
            <div className="mainy">
            <img src={Logo} alt=""/>
            <h3 id="logName">Folks</h3>
            </div>
            <div className="linky">
            </div>
        </div>
        <div className="col" id="col3">
        <h3 id="heady">
            Contact Us 
        </h3>
        <h4>Email - contact@wefolks.co</h4>
        <h4>Phone - +91 8447992890</h4>
        </div>
        <div className="col" id="col2">
            <h3 id="heady">
            Useful Links
            </h3>
            <ul>
            <li data-menuanchor="firstPage"><a href="https://wefolks.co" target='_blank'
                           rel="noopener noreferrer">Home</a></li>
            <li data-menuanchor="firstPage"><a href="https://github.com/WeFolks/FolksPrivacy/blob/main/privacy-policy.md" target='_blank'
                           rel="noopener noreferrer">Privacy Policy</a></li>
            <li data-menuanchor="secondPage"><a href="https://github.com/WeFolks/FolksPrivacy/blob/main/privacy-policy.md" target='_blank'
                           rel="noopener noreferrer">Terms and Conditions</a></li>
            <li data-menuanchor="3rdPage"><a href="https://github.com/WeFolks/FolksPrivacy/blob/main/privacy-policy.md" target='_blank'
                           rel="noopener noreferrer">Refund Policy</a></li>
            </ul>
        </div>
      </div>

    </div>
  );
};

export default LandingPage;
