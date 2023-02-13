import React from 'react';

import '../assets/css/page.css';
import '../assets/css/reset.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import fontawesome from '@fortawesome/fontawesome';
import {faChevronCircleRight, faMapMarker, faMapMarkerAlt, faUsers} from "@fortawesome/free-solid-svg-icons";


fontawesome.library.add(faUsers, faMapMarker, faChevronCircleRight)

export default function EventDetails(props) {
    function launchMap(){
        const url = 'https://www.google.com/maps/dir//'+props.destinationCordinates;
        console.log(url);
        //open url in new page

        window.open(url);
    }

    return (
        <div style={{justifyItems: "flex-start", flexDirection: "column"}}>
            <div className="title">
                <div className="topic2" style={{
                    'fontSize': '17px',
                    'fontFamily': 'font6',
                    'marginRight': '10px'
                }}>Event Name:
                </div>
                <div className="eventName">{props.event.name}</div>
            </div>

            <div className="description" style={{justifySelf: "flex-start"}}>
                <div className="topic">Description</div>
                <div className="descContent">
                    {props.event.description}
                </div>
            </div>

            <div className="address block">
                <div className="topic">Address</div>
                <div className="addBox">
                    <div className="addContent">
                        {props.event.description}
                    </div>
                        <div className="directions" onClick={launchMap}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                        </div>
                </div>
            </div>

            <div className="eventType block">
                <div className="topic">Event Type</div>
                <div className="categBlock">
                    {
                        props.event.type === 0 ?
                            "PUBLIC" :
                            "REQUEST TO JOIN"
                    }
                </div>
            </div>
            <div className="participantBlock">
                <div className="attendees">
                    <div className="topic">Attendees</div>
                    <div className="attenCount">{8}</div>
                    <a href="#popup1" style={{'textDecoration': 'none', 'color': 'black'}}>
                        <FontAwesomeIcon icon={faUsers} />
                    </a>
                </div>

                <a href="#popup1" style={{'textDecoration': 'none', 'color': 'black'}}>
                    <div className="picsArray">
                        <div className="listPics">
                            {props.event.participantPhotos.map(pic => <img src={pic}/>)}
                        </div>

                        <div className="viewAll" style={{
                            'margin': '0 10px',
                            'fontStyle': 'italic',
                            'textDecoration': 'underline;max-width: 40%',
                        }}>
                            View All 3 Participants
                        </div>
                        <FontAwesomeIcon icon={faChevronCircleRight} />
                    </div>
                </a>
                <hr/>
                <div className="hostName ">
                    <div className="topHost">
                        <div className="topic1">Host</div>
                        <div className="hostBlock">{props.event.hostName}</div>
                        <div className="hostPic">
                            <img src={props.event.hostProfilePhoto} alt={""}/>
                        </div>
                    </div>
                    <div className="bottomHost">
                        <button onClick={()=>{props.setShowModal(true)}} style={{'textDecoration': 'none', 'background': '0', 'border': 'hidden' }}>
                            <div className="profile">
                                View Profile
                            </div>
                        </button>
                        <button onClick={()=>{props.setShowModal(true)}} style={{'textDecoration': 'none', 'background': '0', 'border': 'hidden' }}>
                            <div className="chatWithHost">
                                Chat with Host
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
