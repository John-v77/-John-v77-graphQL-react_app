import React, { useContext, useEffect, useState } from 'react';
import actions from '../../../API/api'
import { UserContext } from '../../aux-components/context/auth-context';


function Booking(props) {

    const [stateZ, setStateZ] = useState({
        isLoading: false,
        bookings:[]
    })


    const [user] = useContext(UserContext)

    //{...loginObj, [e.target.name] : e.target.value}

    const fetchBookings=()=>{

        setStateZ({...stateZ, [stateZ.isLoading]: true})
        console.log(user.token, 'hey^^^')
        actions.fetchBookedEvents(user.token)
            .then((res) => {
                if(res.status !==200 && res.status !==201)  {throw new Error('Failed')}
                return res
            })
            .then(resData => {
                
                console.log(resData, 'server Res')
                // setStateZ({...stateZ, 
                //             [stateZ.bookings]: resData.data.data, 
                //             [stateZ.isLoading]: false
                //         })
            })
            .catch((err) => {
                console.log(err)
                setStateZ({...stateZ, [stateZ.isLoading]: false})
            }) 
        
    }

    useEffect(()=>{fetchBookings()}, [])
    
    return (
        <div>
            <button onClick={fetchBookings}>load</button>
        </div>
    );
}

export default Booking;