const Event = require('../../models/event')
const User = require('../../models/user')
const { transformEvent } = require('./merge-data')

module.exports = {

    // Fetch event resolver
    events: async _=> {

        try{
            const events = await Event.find()
            return events.map(each =>   transformEvent(each)    )
        } catch(err) { throw err }
    },


    // Create event Resolver _________________________________________________
    createEvent: async (args, req)=>{
        //adds protected route
        if(!req.isAuth){ throw new Error('Not authenticated!') }

        const event = new Event({
            title:args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: req.userId
        })

        let createdEvent
        try{
            const result = await event.save()
            // save() is provided by the mongoose package
            createdEvent = transformEvent(result)

            const creator = await User.findById(req.userId)
            if(!creator){ throw new Error('User not found.') }


            creator.createEvent.push(event)
            await creator.save()

            return createdEvent
        } catch(err) { throw err }
    },
    // end of Create event Resolver __________________________________________

}
