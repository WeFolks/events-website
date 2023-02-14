import React from 'react';

import '../assets/css/page.css';
import '../assets/css/reset.css';
import RedirectToEventModal from "./redirectToEventModal";

export default function JoinEvent(props) {

    return (
        <>
            <div className="joinEvent">
                <div className="bottomTitle">
                    Sign Up in the Folks app
                </div>
                <div className="botText">
                    Explore and follow fun communities, events and activities around you on the app
                </div>
                <button onClick={() => {props.setShowModal(true);}} style={{'textDecoration': 'none', 'width': '50%', 'background': '0', 'border': 'hidden' }}>
                    <div className="joinEventButton">
                        Join Event
                    </div>
                </button>
            </div>

            <RedirectToEventModal showModal={props.showModal} setShowModal={props.setShowModal} />
        </>
    )
}
