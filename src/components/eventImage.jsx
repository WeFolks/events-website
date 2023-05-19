import React from 'react';

import '../assets/css/page.css';
import '../assets/css/reset.css';

export default function EventImage(props) {
    return (
        <>
            <div className="picture" style={{width:"90%"}}>
                <img src={props.src}  alt={''}/>
            </div>
        </>
    )
}
