import React, { useState } from 'react';
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
        <button onClick={handleJoinEventClick} style={{ textDecoration: 'none', width: '50%', background: 0, border: 'hidden' }}>
          <div className="joinEventButton">
            Join Event
          </div>
        </button>
        {isModalOpen && <RegistrationModal onClose={handleModalClose} />}
      </div>
    </>
  )
}

function RegistrationModal(props) {
  const { onClose } = props;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <RegistrationForm />
      </div>
    </div>
  );
}
