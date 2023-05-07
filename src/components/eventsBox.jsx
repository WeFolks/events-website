import React, {useEffect, useState} from 'react'

import '../assets/css/page.css';
import '../assets/css/reset.css';
import EventImage from "./eventImage";
import EventDateAndTime from "./eventDateAndTime";
import EventDetails from "./eventDetails";
import JoinEvent from "./joinEvent";
import {useParams} from "react-router-dom";
import NotFound from "../assets/images/not-found.jpg";
import styled from "styled-components";
import Loader from "./loader";

const StyledNotFound = styled.img`
      width: 50%;
      margin-top: 30%;
      @media (max-width: 456px) {
        width: 100%;
      }
    `;
export default function EventsBox() {
    const [showPopup, setShowPopup] = useState(false);
    const [event, setEvent] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const [showNotFound, setShowNotFound] = useState(false);
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const url = process.env.REACT_APP_SERVER_URL;
            const response = await fetch(url + "/event/" + id);
            const responseJson = (
                ({
                     ok, status, statusText, headers,
                 }) => ({
                    ok, status, statusText, headers,
                })
            )(response);

            try {
                responseJson.result = await response.json();
                console.log(responseJson.result);
            } catch (ex) {
                responseJson.ok = false;
                responseJson.result = null;
            }

            if (response.status !== 200) {
                console.log(response.status);
                setShowNotFound(true);
            } else {
                setEvent(responseJson.result);
                setShowNotFound(false);
            }
            setIsLoading(false);
        }
        fetchData();
    }, [id]);

    if (isLoading) {
        return <Loader />; // Show loader while data is being fetched
    }

    return (
        showNotFound ?
            <>
                <StyledNotFound src={NotFound} alt={"#"}/>
            </>
            :
            <>

                <div className={'mainPage'}>
                    {(true)&& <div className="confirmBox" style={{fontFamily:'Poppins', border:'1px solid black', margin:'10px', padding:'15px 20px', borderRadius:'20px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.7)'}}> 
                        <div className="confirmText"style={{fontSize:'18px', marginBottom:'10px', color:'#ff7958'}}>Congratulations!! Your booking is confirmed and sent to your email</div>
                        <div className="appInfo" style={{textAlign:'start', fontSize:'13px'}}>
                        <div className="info" style={{textAlign:'start', fontSize:'13px', display:'inline', fontWeight:'600'}}>Download our app NOW to- <br /><br />
                            1. Discover exciting events</div> in your locality<br /><br />
                            <div className="info" style={{textAlign:'start', fontSize:'13px', display:'inline', fontWeight:'600'}}>2. Stay connected</div> with your favorite communities and people<br /><br />
                            <div className="info" style={{textAlign:'start', fontSize:'13px', display:'inline', fontWeight:'600'}}>3. Get updates</div> for highlight events<br /><br />
                            <div className="info" style={{textAlign:'start', fontSize:'13px', display:'inline', fontWeight:'600'}}>4. Track your activity</div> and share it with the world<br /><br />
                            <div className="info" style={{textAlign:'start', fontSize:'13px', display:'inline', fontWeight:'600'}}>5. Get exclusive discounts</div> and more by downloading our app!
                        </div>
                    </div> }
                    <div className={"initialData"}>
                        <EventImage src={event.eventPhoto}/>
                        
                    </div>
                    <div className={"rest"}>
                        <EventDateAndTime date={event.date} time={event.time}/>
                        <EventDetails
                            event={event}
                            showModal={showPopup}
                            setShowModal={setShowPopup}
                        />
                        <JoinEvent showModal={showPopup} setShowModal={setShowPopup} event={event}/>
                    </div>
                </div>
            </>
    )
}
