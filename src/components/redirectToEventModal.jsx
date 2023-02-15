import Modal from 'react-modal';

import '../assets/css/page.css';
import '../assets/css/reset.css';

import QR from "../assets/images/qr-code.png";
import GooglePlay from "../assets/images/goog_play.png";
import styled from "styled-components";

const StyledQR = styled.img`
      height: 50%;
      @media (max-width: 456px) {
        width: 50%;
      }
    `;
const StyledGooglePlay = styled.img`
        @media (max-width: 456px) {
          width: 70%;
        }
    `;

export default function RedirectToEventModal(props) {




    return <>
        <Modal
            isOpen={props.showModal}
            id={"popup1"}
            className={"popup"}
        >
                    <StyledQR id="img-1" src={QR} alt="" />
                    <h2>Scan QR to Download</h2>
                    <button className="close" onClick={() => {props.setShowModal(false)}} style={{'background': '0', 'border': 'hidden'}}>
                        &times;
                    </button>
                    <div className="content">
                        Explore and follow fun communities, events and activities around you on the app
                    </div>
                    <div style={{
                        'fontSize': '20px',
                        'fontFamily': 'font5'
                    }}>

                    </div>
                    <a id="img2" href="https://play.google.com/store/apps/details?id=com.folks.folks_project" target="_blank" rel="noreferrer">
                        <StyledGooglePlay src={GooglePlay} alt=""/>
                    </a>
        </Modal>
    </>
}

