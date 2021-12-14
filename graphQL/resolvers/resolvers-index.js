const bcrypt = require('bcryptjs')

const Event = require('../../models/event')
const User = require('../../models/user')
const Booking = require('../../models/booking')

const { dateToString } = require('../../helpers/date')


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


const transformEvent = event => {
    return {
        ...event._doc,
        _id: event._doc._id,
        date: dateToString(event._doc.date),
        creator: user.bind(this, event.creator)
    }
}


const transformBooking = booking =>{
    return{
        ...result._doc,
        _id: result.id,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createAt:new Date(result._doc.createAt).toISOString(),
        updatedAt:new Date(result._doc.updatedAt).toISOString()
    }
}


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




module.exports = {

    events: async _=> {

        try{
            const events = await Event.find()
            return ev.map(each =>   transformEvent(each)    )
        } catch(err) { throw err }
    },
    // Create event Resolver _________________________________________________
    bookings:async _=>{
        try{
        const bookings = await Booking.find()
        return bookings.map(each =>  transformBooking(each)  )
        }catch(err) {throw err}
    },

    createEvent: async (args)=>{
        const event = new Event({
            title:args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '5c0d'
        })

        let createdEvent
        try{
            const result = await event.save()
            // save() is provided by the mongoose package
            createdEvent = transformEvent(result)

            const creator = await User.findById('5c0d')
            if(!creator){ throw new Error('User not found.') }


            creator.createEvent.push(event)
            await creator.save()

            return createdEvent
        } catch(err) { throw err }
    },
    // end of Create event Resolver __________________________________________

    // Create User Resolver __________________________________________________
    createUser: async args =>{
        try{
            const existingUser = await User.findOne({email:args.userInput.email})
            if(existingUser) throw new Error('User exists already.')

            const hashedPassword =  await bcrypt.hash(args.userInput.password, 12)

            const user = new User({
                email: args.userInput.email,
                password: args.userInput.password
            })

            const result = await user.save()

            return {...result._doc, password:null,  _id: result.id}    

        }catch(err) { throw err }
    },
    // end of User Resolver __________________________________________________


    // Create Book event Resolver __________________________________________________
    bookEvent: async eventId => {
        try{
        const fetchedEvent = await Event.findOne({_id: args.eventId})
        const booking = new Booking({
            user: '5c0d',
            event: fetchedEvent 
        })
        const result = await booking.save()
        return transformBooking(result)

        }catch(err){throw err}
    },

    // end of Create Booking Resolver ____________________________________________

    // cancel Booking Resolver____________________________________________________

    cancelBooking: async args => {
        try{
            const booking = await Booking.findById(args.bookingId).populate('event');
            
            const event = transformEvent(booking.event)

            await Booking.deleteOne({_id:args.bookingId})
            return event;
        
        }catch(err){throw err} 
    }
}
