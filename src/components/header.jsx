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
            </div>
        </>
    )
}

