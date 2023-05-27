import React, {useState} from 'react';
import {useEffect} from 'react';
import manImage from './man_profile.png';

import '../assets/css/page.css';
import '../assets/css/reset.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import fontawesome from '@fortawesome/fontawesome';
import {faChevronCircleRight, faMapMarker, faMapMarkerAlt, faUsers} from "@fortawesome/free-solid-svg-icons";


fontawesome.library.add(faUsers, faMapMarker, faChevronCircleRight)

export default function EventDetails(props) {
    const google = window.google;
    const [loaded, setLoaded] = useState(false);
    const [hostPhotoLoaded, setHostPhotoLoaded] = useState(true);

    const handleImageLoadError = () => {
        setHostPhotoLoaded(false);
    }

    useEffect(() => {
        const map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: props.event.locationLatitude, lng: props.event.locationLongitude}, // Replace with your latitude and longitude
            zoom: 15, // Adjust the zoom level as needed
            disableDefaultUI: true,
        });
    }, []);

    function launchMap() {
        const url = 'https://www.google.com/maps/dir//' + props.event.locationLatitude + ',' + props.event.locationLongitude;
        //open url in new page
        window.open(url);
    }

    return (
        <div style={{alignItems: "flex-start", flexDirection: "column"}}>
            <div className="title">

                <div className="eventName">{props.event.name}</div>
            </div>

            <div className="address block" style={{textAlign: "start"}}>
                <div className="topic">Venue</div>
                <div className="addBox">
                    <div className="addContent">
                        {props.event.address.split(',')[0] + ',' + props.event.address.split(',')[1]}
                    </div>
                    <div className='mapContainer' id="map" style={{marginTop: '-3vh'}} onClick={launchMap}>
                        {/* <iframe
                                width="150vh"
                                height="100vh"
                                loading="lazy" allowfullscreen
                                src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyD61TVIdBx1jr4BG5AyDZS4Omh2b4NaiGM&q="+props.event.locationLatitude+','+props.event.locationLongitude}>
                            </iframe> */}
                    </div>
                </div>

            </div>

            {
                props.event.participantLimit != null && props.event.participantLimit !== 0 &&
                <div className="description block"
                     style={{textAlign: "start", display: 'flex', justifyContent: 'start'}}>
                    <div className="topic" id='parti' style={{width: '40vw'}}>Participant Limit:</div>
                    <div className="participantLimit" style={{
                        fontSize: '15px',
                        fontFamily: 'Poppins',
                        lineHeight: '18px',
                    }}>
                        {props.event.participantLimit > 300 ? "Open for All" : props.event.participantLimit}
                    </div>
                </div>
            }
            {
                props.event.participantLimit != null && props.event.participantLimit !== 0 &&
                <div className="description block"
                     style={{textAlign: "start", display: 'flex', justifyContent: 'start'}}>
                    <div className="topic" id="pricy" style={{width: '15vw'}}>Price:</div>
                    <div className="priceDiv" style={{
                        fontSize: '15px',
                        fontFamily: 'Poppins',
                        lineHeight: '18px',
                    }}>
                        Rs. {props.event.paymentAmount}
                    </div>


                    <div style={{fontSize: '13px', lineHeight: '13px'}}> &nbsp;&nbsp;+
                        Rs. {(props.event.webPaymentAmount - props.event.paymentAmount).toFixed(2)} (Platform
                        Fee)
                    </div>
                </div>

            }

            <div className="downloadNow">
                (Book using our free app and pay no Platform Fee for any activity)
            </div>
            <div className="description block" style={{textAlign: "start"}}>
                <div className="topic" style={{width: '40vw'}}>About the activity</div>
                <div className="descContent">
                    {props.event.description.split("\n").map((line, index) => (
                        <div key={index}>
                            {line}
                            <br/>
                        </div>
                    ))}
                </div>
            </div>

            <div className="eventType block">
                <div className="topic">Event Type:</div>
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
                    <div className="topic" style={{width: '22vw'}}>Attendees:</div>
                    <div
                        className="attenCount">{props.event.participantPhotos ? props.event.participantPhotos.length : 0}</div>

                </div>

                <div onClick={() => props.setShowModal(true)}
                     style={{'textDecoration': 'none', 'color': 'black', 'background': '0', 'border': 'hidden'}}>
                    <div className="picsArray">
                        <div className="listPics">
                            {props.event.participantPhotos?.map(pic => (
                                <React.Fragment key={pic}>
                                    {(!pic || loaded) && (
                                        <img
                                            src={pic || manImage}
                                            alt=""
                                            onLoad={() => setLoaded(true)}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                        <a href="https://play.google.com/store/apps/details?id=com.folks.folks_project" target='_blank'
                           rel="noopener noreferrer">
                            <div className="viewAll" style={{
                                'margin': '0 10px',
                                'fontStyle': 'italic',
                                'textDecoration': 'underline;max-width: 40%',
                            }}>
                                View All {props.event.participantPhotos?.length} Participants
                            </div>
                        </a>
                        <FontAwesomeIcon icon={faChevronCircleRight}/>
                    </div>
                </div>
                <hr/>
                <div className="hostName ">
                    <div className="topHost">
                        <div className="topic" style={{width: "10vw"}}>Host:</div>
                        <div className="hostBlock">{props.event.hostName}</div>
                        <div className="hostPic">
                            {
                                hostPhotoLoaded ?
                                    <img
                                        src={(props.event.hostProfilePhoto === null || props.event.hostProfilePhoto === '') ? manImage : props.event.hostProfilePhoto}
                                        onError={handleImageLoadError}
                                        alt={"Host Photo"}/>
                                    :
                                    <img src={manImage} alt={"Host Image"}/>
                            }

                        </div>
                    </div>
                    <div className="bottomHost" style={{display: 'none'}}>
                        <a href="https://play.google.com/store/apps/details?id=com.folks.folks_project" target='_blank'
                           rel="noopener noreferrer">
                            <button style={{'textDecoration': 'none', 'background': '0', 'border': 'hidden'}}>
                                <div className="profile">
                                    View Profile
                                </div>
                            </button>
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=com.folks.folks_project" target='_blank'
                           rel="noopener noreferrer">
                            <button style={{'textDecoration': 'none', 'background': '0', 'border': 'hidden'}}>
                                <div className="chatWithHost">
                                    Chat with Host
                                </div>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
