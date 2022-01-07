import React from 'react';
import './eventItem.css'

function EventItem(props) {
    return (
        <li key={props.eventId} className="events__list-item">
            <div>
                <h2>{props.title}</h2>
                <h3>${props.price} - {new Date(props.date).toLocaleString()}</h3>
            </div>

            <div>
                <button className='btn'>View Details</button>
            </div>
        </li>
    );
}
export default EventItem;