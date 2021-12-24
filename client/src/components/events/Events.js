import React, { useState } from 'react';
import Backdrop from '../backdrop/Backdrop';
import Modal from '../modal/Modal';
import './events.css'

function Events(props) {

    const [creatingEvent, setCreatingEvent] = useState(false)

    const createEventHandler =()=>{setCreatingEvent(true)}

    const modalCancel =()=>{setCreatingEvent(false)}

    const modalConfirm =()=>{setCreatingEvent(false)}


    return (
        <div>
            <>  
                {creatingEvent && <Backdrop/>}
                {creatingEvent && 
                                <Modal title="Add Event" canCancel canConfirm onCancel={modalCancel} onConfirm={modalConfirm}>
                                    <p>Model Content</p>
                                </Modal>
                }
                <div className='events-control'>
                    <p>Share your own Events!</p>
                    <button className='btn' onClick={createEventHandler}> Create Event</button>
                </div>
            </>
        </div>
    );
}

export default Events;