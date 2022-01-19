import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../aux-components/context/auth-context';
import Backdrop from '../../aux-components/backdrop/Backdrop';
import Modal from '../../aux-components/modal/Modal';
import Spinner from '../../aux-components/spinner/Spinner';
import EventList from '../../aux-components/event-list/EventList';
import actions from '../../../API/api'
import './events.css';

function Events(props) {

    const [user] = useContext(UserContext)
    const token = user.token
    // console.log(user)
 
    const [creatingEvent, setCreatingEvent] = useState(false)
    const [eventCreated, setEventCreated] = useState({})
    const [eventsList, setEventsList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const createEventHandler =()=>{setCreatingEvent(true)}

    const recordVal=(e)=>{ 
        setEventCreated({...eventCreated, [e.target.id] : e.target.value}) 
    }

    const modalCancel =()=>{setCreatingEvent(false)}

    const modalConfirm =(e)=>{
        e.preventDefault()
        setCreatingEvent(false)
        
        // guard clause

        if (eventCreated.title.trim().lenght === 0 ||
            eventCreated.description.trim().lenght === 0 ||
            +eventCreated.price <= 0 
            ) return


        //API call
        actions.createEvent(eventCreated, token)
            .then((res) => {
                if(res.status !==200 && res.status !==201)  {throw new Error('Failed')}
                return res
            })
            .then(res => {
                fetchEvents()
            })
            .catch((err) => console.log(err)) 

    }

    //Fetch all events
    const fetchEvents =()=>{

        setIsLoading(true)

        actions.fetchEvents()
            .then((res) => {
                if(res.status !==200 && res.status !==201)  {throw new Error('Failed')}
                return res
            })
            .then(resData => {
                
                // console.log(resData.data.data.events)
                setEventsList(resData.data.data.events)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
            }) 
    }


    useEffect(()=>{
        let isMounted = true
        isMounted && fetchEvents()

        return(()=> isMounted = false)
    }, [])


    return (
        <div>
                
                {creatingEvent && <Backdrop/>}
                {creatingEvent && 
                                <Modal title="Add Event" canCancel canConfirm onCancel={modalCancel} onConfirm={modalConfirm}>
                                    <p>Model Content</p>

                                    <form>
                                        <div className='form-control'>
                                            <label htmlFor='title'>Title</label>
                                            <input type="text" onChange={recordVal} placeholder='your new event' id="title"></input>
                                        </div>
                                        <div className='form-control'>
                                            <label htmlFor="price">Price</label>
                                            <input type="number" onChange={recordVal} id="price" placeholder='9.99'></input>
                                        </div>
                                        <div className='form-control'>
                                            <label htmlFor="date">Date</label>
                                            <input type="datetime-local" onChange={recordVal} id="date"></input>
                                        </div>
                                        <div className='form-control'>
                                            <label htmlFor="description">Description</label>
                                            <textarea rows={'4'} onChange={recordVal} id="description"></textarea>
                                        </div>
                                    </form>
                                </Modal>
                }
                {token &&
                        <div className='events-control'>
                            <p>Share your own Events!</p>
                            <button className='btn' onClick={createEventHandler}> Create Event</button>
                        </div>}
                    {isLoading && <Spinner/>}
                    <EventList events={eventsList} userId={user.user} />
        </div>
    );
}

export default Events;