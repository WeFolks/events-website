import React, {useEffect, useState} from 'react'

import '../assets/css/page.css';
import '../assets/css/reset.css';
import EventImage from "./eventImage";
import EventDateAndTime from "./eventDateAndTime";
import EventDetails from "./eventDetails";
import JoinEvent from "./joinEvent";
import {useParams} from "react-router-dom";
import NotFound from "../assets/images/not-found.jpg";

// const eventName = "Graffiti wall";
// const description  = "Hello All welcome to my event Football match. \n\n It is going to be a begineer match 10v0";
// const address  = "Indirapuram Habitat Center, Ghaziabad assf assffg dswssh rshs dtyj tyjt";
// const eventPicture = "https://wefolks.s3.ap-south-1.amazonaws.com/63c32aa950c386c46e1733a7.jpg"
// const date = "23/03/2023";
// const time = "10:00 AM";
// const destCoordinates = "28.6478812,77.3764113";
// const eventType = 0;
// const picList = ["https://wefolks.s3.ap-south-1.amazonaws.com/63c919fac7083ddf61a9699f.jpg","https://wefolks.s3.ap-south-1.amazonaws.com/63c919fac7083ddf61a9699f.jpg","https://wefolks.s3.ap-south-1.amazonaws.com/63c919fac7083ddf61a9699f.jpg","https://wefolks.s3.ap-south-1.amazonaws.com/63c919fac7083ddf61a9699f.jpg","https://wefolks.s3.ap-south-1.amazonaws.com/63c919fac7083ddf61a9699f.jpg","https://wefolks.s3.ap-south-1.amazonaws.com/63c919fac7083ddf61a9699f.jpg"]
// const hostPic = "https://wefolks.s3.ap-south-1.amazonaws.com/63c919fac7083ddf61a9699f.jpg"

// {
//     "eventPhoto": "https://wefolks.s3.ap-south-1.amazonaws.com/63c8da93c7083dd284449a24.jpg",
//     "date": "23/3/2023",
//     "time": "10:3",
//     "name": "Grafitti",
//     "description": "dndm",
//     "address": "Shriram Samruddhi Apartments, Varthur Road, Silver Springs Layout, Munnekollal, Bengaluru, Karnataka, India",
//     "type": 0,
//     "participantPhotos": [
//     "https://lh3.googleusercontent.com/a/AEdFTp6PmZnHKMfcTAKtxyifypWBvRuExzZG4gMiw_NW=s96-c"
// ],
//     "hostName": "Mudit Shivendra",
//     "hostProfilePhoto": "https://lh3.googleusercontent.com/a/AEdFTp6PmZnHKMfcTAKtxyifypWBvRuExzZG4gMiw_NW=s96-c",
//     "locationLatitude": 12.9530319,
//     "locationLongitude": 77.7166786
// }
export default function EventsBox() {
    const [showPopup, setShowPopup] = useState(false);
    const [event, setEvent] = useState({});
    const { id } = useParams();
    const [showNotFound, setShowNotFound] = useState(true);

    useEffect(()=> {
        async function fetchDate() {

            const response = await fetch("https://5auyrh3d2l.execute-api.ap-south-1.amazonaws.com/test/event/"+id)
            const responseJson = (
                ({
                     ok, status, statusText, headers,
                 }) => ({
                    ok, status, statusText, headers,
                })
            )(response);


            try {
                responseJson.result = await response.json();
            } catch (ex) {
                responseJson.ok = false;
                responseJson.result = null;
            }

            if(response.status !== 200) {
                console.log(response.status)
                setShowNotFound(true);
            } else {
                setEvent(responseJson.result);
                setShowNotFound(false);
            }
        }
        fetchDate();
    })

    return (
        showNotFound ?
            <>
                <img src={NotFound}  alt={"#"} style={{height: "50%"}}/>
            </>
            :
        <>

                <h1>Fetching Event</h1> :
                <div className={'mainPage'}>
                    <div className={"initialData"}>
                        <EventImage src={event.eventPhoto}/>
                        <EventDateAndTime date = {event.date} time={event.time} />
                    </div>
                    <div className={"rest"}>
                        <EventDetails
                            event={event}
                            showModal={showPopup}
                            setShowModal={setShowPopup}
                        />
                        <JoinEvent showModal={showPopup} setShowModal={setShowPopup}/>
                    </div>
                </div>
        </>
    )
}
