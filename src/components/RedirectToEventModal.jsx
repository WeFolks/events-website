import Modal from 'react-modal';

import '../assets/css/page.css';
import '../assets/css/reset.css';

import QR from "../assets/images/qr-code.png";
import GooglePlay from "../assets/images/goog_play.png";

export default function RedirectToEventModal(props) {
    return <>
        <Modal
            isOpen={props.showModal}
            className={"popup"}
        >
                    <img id="img-1" src={QR} alt="" style={{height: "50%", width:""}}/>
                    <h2>Scan QR to Download</h2>
                    <a className="close" onClick={() => {props.setShowModal(false)}}>&times;</a>
                    <div className="content">
                        Explore and follow fun communities, events and activities around you on the app
                    </div>
                    <div style={{
                        'fontSize': '20px',
                        'fontFamily': 'font5'
                    }}>

                    </div>
                    <a id="img2" href="https://play.google.com/store/apps/details?id=com.folks.folks_project">
                        <img src={GooglePlay} alt=""/>
                    </a>
        </Modal>
    </>
}

