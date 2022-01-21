import React from 'react';
import EventItem from '../event-item/EventItem';
import './eventList.css'

function EventList(props) {


    const events = props.events.map((each, index) => {
        // console.log(each, 'id^^')
        return (
            <EventItem
                eventId={each._id}
                title={each.title}
                price={each.price}
                date={each.date}
                description={each.description}
                creatorId={each.creator.email} //needs update once the back end is in order
                userId={props.userId}
                key={index}
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