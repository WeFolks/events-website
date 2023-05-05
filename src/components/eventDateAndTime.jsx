import React from 'react';

import '../assets/css/page.css';
import '../assets/css/reset.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import fontawesome from '@fortawesome/fontawesome';
import {faCalendar, faClock} from "@fortawesome/free-solid-svg-icons";

fontawesome.library.add(faCalendar, faClock)


export default function EventDateAndTime(props) {

    function convertTo12Hour(time) {
        // Split the input time string (e.g., "23:15") into hours and minutes
        let [hours, minutes] = time.split(":");

        // Convert the hours and minutes to integer values
        hours = parseInt(hours);
        minutes = parseInt(minutes);

        // Determine the AM or PM period
        let period = hours >= 12 ? "PM" : "AM";

        // Convert the 24-hour format hours to the 12-hour format
        if (hours > 12) {
            hours -= 12;
        } else if (hours === 0) {
            hours = 12;
        }

        // Format the output string with leading zeros for single-digit hours and minutes
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
    }

    return (
        <>
            <div className="rightContent">
                <div className="date">

                    <div className="topic">
                        <FontAwesomeIcon icon={["fas", "fa-calendar"]} style={{"marginRight":"10px"}}/>
                         Date
                    </div>
                    <div style={{'height': '10px'}}></div>
                    <div className="dateContent">{props.date}</div>

                </div>
                <div className="time">
                    <div className="topic">
                        <FontAwesomeIcon icon={["fas", "fa-clock"]} style={{"marginRight":"7px"}}/>
                        Time
                    </div>
                    <div style={{'height': '10px'}}></div>
                    <div className="timeContent">{convertTo12Hour(props.time)}</div>
                </div>
            </div>
        </>
    )
}
