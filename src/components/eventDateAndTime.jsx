import React from 'react';

import '../assets/css/page.css';
import '../assets/css/reset.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import fontawesome from '@fortawesome/fontawesome';
import {faCalendar, faClock} from "@fortawesome/free-solid-svg-icons";

fontawesome.library.add(faCalendar, faClock)


export default function EventDateAndTime(props) {
    return (
        <>
            <div className="rightContent">
                <div className="date">

                    <div className="topic">
                        <FontAwesomeIcon icon={["fas", "fa-calendar"]}/>
                        Date
                    </div>
                    <div style={{'height': '10px'}}></div>
                    <div className="dateContent">{props.date}</div>

                </div>
                <div className="time">
                    <div className="topic">
                        <FontAwesomeIcon icon={["fas", "fa-clock"]} />
                        {/*<i className="fa fa-clock-o"></i>*/}
                        Time
                    </div>
                    <div style={{'height': '10px'}}></div>
                    <div className="timeContent">{props.time}</div>
                </div>
            </div>
        </>
    )
}
