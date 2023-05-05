import React from 'react'
import Logo from "../assets/images/logo.png"
import '../assets/css/page.css';
import '../assets/css/reset.css'

export default function Header() {
    return (
        <>
            <div className="nav">
                <img src={Logo} alt=""/>
                    <h1>Folks</h1>
                    <a href="https://play.google.com/store/apps/details?id=com.folks.folks_project" target='_blank' rel="noopener noreferrer">
                        <button style={{ textDecoration: 'none', background: 0, border: 'hidden' }}>
                        <div className="downloadApp" style={{position:'absolute', top:'15px', right:'20px', padding:'10px', backgroundColor:"white", color:"#ff7958"}}>
                            Download App
                        </div>
                        </button>
                    </a>
            </div>
        </>
    )
}

