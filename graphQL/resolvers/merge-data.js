const Event = require('../../models/event')
const User = require('../../models/user')
const { dateToString } = require('../../helpers/date')
const {singleEvent, user} = require('./merge-data')

// function to be used to retrieve the user info in the resolver
const user = async userId => {
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
    return {
        ...event._doc,
        _id: event._doc._id,
        date: dateToString(event._doc.date),
        creator: user.bind(this, event.creator)
    }
}


// function to populate the booking
const transformBooking = booking =>{
    return{
        ...result._doc,
        _id: result.id,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createAt:dateToString(result._doc.createAt),
        updatedAt:dateToString(result._doc.updatedAt),
    }
}


exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
