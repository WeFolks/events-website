import React, {useState} from 'react';
import '../assets/css/page.css';
import '../assets/css/reset.css';
import RegistrationForm from "./registrationForm";

export default function JoinEvent(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const hasDateTimePassed = (dateString, timeString) => {
        if (typeof dateString !== 'string' || typeof timeString !== 'string') {
            throw new Error('Both dateString and timeString must be strings');
        }

        const dateParts = dateString.split('/');
        if (dateParts.length !== 3) {
            throw new Error('Invalid date string');
        }

        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1;
        const year = parseInt(dateParts[2], 10);

        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            throw new Error('Invalid date string');
        }

        const [hours, minutes] = timeString.split(':');
        const timeParts = [hours, minutes].map(part => parseInt(part, 10));
        if (timeParts.some(isNaN)) {
            throw new Error('Invalid time string');
        }

        const dateObject = new Date(Date.UTC(year, month, day, ...timeParts));
        const now = new Date();
        return now > dateObject;
    };


    const handleJoinEventClick = () => {
        // console.log(props.event.date);
        // console.log(props.event.time);
    
        if (hasDateTimePassed(props.event.date, props.event.time)) {
            window.alert("The event date and time have passed");
        } else if (props.event.participants.length >= props.event.participantLimit) {
            window.alert("The participant limit for this event has been reached");
        } else if (props.event.category !== 0) {
            window.alert("Download app to join invitational event");
            // Redirect to app or popup
        } else {
            setIsModalOpen(true);
        }
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <div className="joinEvent">
                <div className="bottomTitle">
                    Sign Up in the Folks app
                </div>
                <div className="botText">
                    Explore and follow fun communities, events and activities around you on the app
                </div>
                <a href="https://play.google.com/store/apps/details?id=com.folks.folks_project" target='_blank'
                   rel="noopener noreferrer">
                    <button style={{textDecoration: 'none', background: 0, border: 'hidden'}}>
                        <div className="downloadApp">
                            Download App
                        </div>
                    </button>
                </a>
                <button onClick={handleJoinEventClick}
                        style={{textDecoration: 'none', width: '50%', background: 0, border: 'hidden'}}>
                    <div className="joinEventButton">
                        <div className="price">Rs. {props.event.paymentAmount}/-<br></br></div>
                        Register
                    </div>
                </button>
                {isModalOpen && <RegistrationModal onClose={handleModalClose} event={props.event}/>}
            </div>
        </>
    )
}

function RegistrationModal(props) {
    const {onClose, event} = props;

    return (
        <div className="modal">
            <div className="modal-content">
                <RegistrationForm closeModal={onClose} event={event}/>
            </div>
        </div>
    );
}
