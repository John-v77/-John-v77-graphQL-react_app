import React from 'react';
import './bookingList.css'


function Booking(props) {

    
    

    return (
        <ul className='bookings__list'>
           {props.bookings.map(each =>{
               return(
                   <li key={each._id} className='bookings__item'>
                       <div className='bookings__item-data'>
                            {each.event.title} - {' '}
                            {new Date(each.createdAt).toLocaleDateString()}
                       </div>
                       <div className='bookings__item-actions'>
                           <button className='btn' onClick={props.onDelete.bind(this, each._id)}>cancel</button>
                       </div>
                   </li>
               )
           })} 
        </ul>
    );
}

export default Booking;