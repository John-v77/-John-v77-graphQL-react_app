import React, { useState } from 'react';
import './eventItem.css'

function EventItem(props) {

    console.log(props)

    const [checkDetails, setCheckDetails] = useState(false)

    const showDetails =(e)=> setCheckDetails(!checkDetails)
    
    const bookEventHandler =(e)=>{
        const requestBody = {
            query:`
                mutation{
                    bookEvent(eventId:"${props.key}"){
                        _id
                        title
                        description
                        date
                        price
                        creator{
                            _id
                            email
                        }
                    }
                }
            `
        }
    }

    return (
        <li key={props.eventId} className="events__list-item">
            <div>
                <h2>{props.title}</h2>
                <h3>${props.price}</h3>
            </div>

            <div>
                <button onClick={showDetails} className='btn'>{checkDetails ? "Hide Details" : "View Details"}</button>
            </div>
            {checkDetails && <div className='events__list-item__details'>
                <h3>{new Date(props.date).toLocaleString()}</h3>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. A eum harum asperiores, quam iusto quod sunt!</p>
                <p>{`Creator: ${props.creatorId}`}</p>
                <p>{`Event ID: ${props.eventId}`}</p>
                <button onClick={bookEventHandler} className='btn'>Book</button>
            </div>}
        </li>
    );
}
export default EventItem;