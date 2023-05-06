import React, {useState} from 'react';
import '../assets/css/page.css';
import '../assets/css/reset.css';
import RegistrationForm from "./registrationForm";

export default function JoinEvent(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleJoinEventClick = () => {
        setIsModalOpen(true);
    }

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
        <a href="https://play.google.com/store/apps/details?id=com.folks.folks_project" target='_blank' rel="noopener noreferrer">
        <button style={{ textDecoration: 'none', background: 0, border: 'hidden' }}>
          <div className="downloadApp">
            Download App
          </div>
        </button></a>
        <button onClick={handleJoinEventClick} style={{ textDecoration: 'none', width: '50%', background: 0, border: 'hidden' }}>
          <div className="joinEventButton">
            <div className="price">Rs. 300/-<br></br></div>
            Book Now
          </div>
        </button>
        {isModalOpen && <RegistrationModal onClose={handleModalClose} event={props.event} />}
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
