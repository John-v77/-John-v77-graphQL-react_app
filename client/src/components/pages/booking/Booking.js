import React, { useContext, useEffect, useState } from 'react';
import actions from '../../../API/api'
import { UserContext } from '../../aux-components/context/auth-context';
import Spinner from '../../aux-components/spinner/Spinner';
import BookingList from '../../aux-components/bookings-list/BookingList';


function Booking(props) {

    const [stateZ, setStateZ] = useState({
        isLoading: false,
        bookings:[]
    })


    const temptData =[
        {event:{
            title: 'a walk in the park'
        },
        createdAt: '156.1235',
        _id:'1'},
        
        {event:{
            title: 'a walk in the park'
        },
        createdAt: '156.1235',
        _id:'2'},
    ] 


    const [user] = useContext(UserContext)

    //{...loginObj, [e.target.name] : e.target.value}


    // Retrieving list of booking from DB
    const fetchBookings=()=>{

        setStateZ({...stateZ, [stateZ.isLoading]: true})

        actions.fetchBookedEvents(user.token)
            .then((res) => {
                if(res.status !==200 && res.status !==201)  {throw new Error('Failed')}
                return res
            })
            .then(resData => {
                
                console.log(resData, 'server Res')
                // setStateZ({...stateZ, 
                //             [stateZ.bookings]: resData.data.data.bookingss, 
                //             [stateZ.isLoading]: false
                //         })
            })
            .catch((err) => {
                console.log(err)
                setStateZ({...stateZ, [stateZ.isLoading]: false})
            }) 
    }

    // Deleting Booking from DB
    const deleteBooking =(bookingId)=>{
        console.log('deleting bookings')
        setStateZ({...stateZ, [stateZ.isLoading]: true})

        actions.cancelBooking(bookingId)
        .then((res) => {
            if(res.status !==200 && res.status !==201)  {throw new Error('Failed')}
            return res
        })
        .then(resData =>{
            
            console.log(resData.data.data._id)
            setStateZ(stateZ =>{
                
                const prevBookings = stateZ.bookings.filter(booking => {
                    return booking._id !== bookingId
                } )

                return {
                        [stateZ.bookings]:prevBookings, 
                        [stateZ.isLoading]: false
                        }
                })                   
        })
        .catch((err) => {
            console.log(err)
            setStateZ({...stateZ, [stateZ.isLoading]: false})
        })

    }
    
    //Display the list of bookings
    const displayBookings=(bookingList)=>{

        if(bookingList.length() === 0) return 'There are no bookings to be displayed'
        //stateZ.bookings
        return ( 
            <BookingList
            bookings ={temptData}
            onDelete = {deleteBooking}
            />
        )
    }

    useEffect(()=>{
        let isMounted = true
        isMounted && fetchBookings()

        return(()=> isMounted = false)
    }, [])
    
    return (
        <div>
            {stateZ.isLoading && <Spinner/>}
            <button onClick={fetchBookings}>load</button>
            {displayBookings()}
        </div>
    );
}

export default Booking;