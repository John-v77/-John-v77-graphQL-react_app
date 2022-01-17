const Event = require('../../models/event')
const User = require('../../models/user')
const { dateToString } = require('../../helpers/date')


// function to be used to retrieve the user info in the resolver
const user = async userId => {
    console.log('calling user')
    try {
    const user = await User.findById(userId)
    return {
        ...user._doc,
        _id :user.id,
        createdEvents: events.bind(this, user._doc.createEvents)
    }
    }catch(err) { throw err }
}


// function to be used to retrieve the events info in the resolver
const events = async eventIds => {
    console.log('calling event')
    try {
        const events = await Event.find({_id: {$in: eventIds}}) // $in - special operator in mangoDb
                
        return events.map(event =>{
            return {
                    ...event._doc,
                    _id: event.id,
                    date: dateToString(event._doc.date),
                    creator:user.bind(this, event.creator)
            }
        })
    } catch(err){ throw err}     
}

// function to be used to retrieve a single event info in the resolver
const singleEvent = async eventId => {
    try{
        const event = await Event.findById(eventId)
        return {
            ...event._doc, 
            _id: event.id,
            user: user.bind(this, booking._doc.user),
            event: singleEvent.bind(this, booking._doc.event),
            creator: user.bind(this, event.creator)
        }
    }catch(err){throw err}
}



// function to populate the event
const transformEvent = event => {

    console.log(
        {
            ...event._doc,
            _id: event.id,
            date: dateToString(event._doc.date),
            creator: user.bind(this, event.creator)
        },

        'what is this object'
    )
    return {
        ...event._doc,
        _id: event.id,
        date: dateToString(event._doc.date),
        creator: user.bind(this, event.creator)
    }
}


// function to populate the booking
const transformBooking = booking =>{
    
    const obj1 = booking
    // console.log('obj1:' , obj1)


    // const obj22 ={

    //     ...booking._doc,
    //     _id: booking.id,
    //     user: user.bind(this, booking.user),
    //     event: singleEvent.bind(this, booking.user),
    //     createAt:booking._doc.createAt,
    //     updatedAt:booking._doc.updatedAt,
    // }

    // console.log('obj22:' , obj22)


    return{

        ...booking._doc,
        _id: booking.id,
        user: user.bind(this, obj1.user),
        event: singleEvent.bind(this, obj1.event),
        createAt:booking._doc.createAt,
        updatedAt:booking._doc.updatedAt,
    }
}


exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
