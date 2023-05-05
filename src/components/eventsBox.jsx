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
    console.log(process.env.REACT_APP_SERVER_URL);
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

                <h1>Fetching Event</h1> :
                <div className={'mainPage'}>
                    <div className={"initialData"}>
                        <EventImage src={event.eventPhoto}/>
                        <EventDateAndTime date={event.date} time={event.time}/>
                    </div>
                    <div className={"rest"}>
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
