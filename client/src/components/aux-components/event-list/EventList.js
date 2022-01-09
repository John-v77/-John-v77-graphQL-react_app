import React from 'react';
import EventItem from '../event-item/EventItem';
import './eventList.css'

function EventList(props) {

    const events = props.events.map(each => {
        return (
            <EventItem
                key={each._id}
                title={each.title}
                price={each.price}
                date={each.date}
                description={each.date}
                creator={each._id}
                userId={props.userId}
            />
        )
    })

    return (
        <ul className='event__list'>
            {events}
        </ul>
    );
}

export default EventList;