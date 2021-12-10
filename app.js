const express = require('express')
const bodyParser = require('body-parser')
const {graphqlHTTP} = require('express-graphql')
const {buildSchema} = require('graphql')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Event = require('./models/event')
const User = require('./models/user')

const app = express()

app.use(bodyParser.json())


// function to be used to retrieve the user info in the resolver
const user = userId => {
    return User.findById(userId)
    .then(user => { 
        return {
            ...user._doc,
             _id :user.id,
            createdEvents: events.bind(this, createdEvents:events.bind(this, user._doc.createEvents))    
            }
        })
    .catch(err => { throw err })
}


// function to be used to retrieve the events info in the resolver
const events = eventIds => {
    return Event.find({_id: {$in: eventIds}}) // $in - special operator in mangoDb
                .then(events => {
                    return events.map(event =>{
                        return {...event._doc,
                                 _id: event.id,
                                creator:user.bind(this, event.creator)}
                    })
                })
}



app.use('/graphql', graphqlHTTP({
    // /the below schema is in a string
    schema: buildSchema(`
        type Event {
            _id:ID!
            title:String!
            description:String!
            price:Float!
            date:String!
            creator:String!
        }

        type User{
            _id: ID!
            email: String!
            password: String
            createdEvents:[Event!]
        }

        input EventInput {
            title:String!
            description:String!
            price:Float!
            date:String!
        }

        input UserInput{
            email:String!
            password:String!
        }
    
        type RootQuery {
            events:[Event!]!
        }

        type RootMutation{
            createEvent(eventInput : EventInput):[String]
            createUser(userInput: UserInput):[String]
        }

        schema {
            query   :   RootQuery
            mutation:   RootMutation
        }`),
    rootValue: {
        events: _=> {
            return Event.find()
            // return is for async await
                .populate('creator')
                .then(ev => {
                    return ev.map(each => {
                        return {
                            ...each._doc,
                            _id:each.id,
                            creator:user.bind(this, each._doc.creator)
                        }
                    })
                })
                .catch(err => { throw err })
        },
        // Create event Resolver _________________________________________________
        createEvent: (args)=>{
            const event = new Event({
                title:args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: new Date(args.eventInput.date),
                creator: '5c0d'
            })

            /* must return the event here, for graphQL to know that resolver executes an async operation
               and wait for it before it continues with the code bellow */
            let createdEvent
            return event
                    .save()
                    // save() is provided by the mongoose package
                    .then(res => {

                        createdEvent = {...res._doc,
                                         _id: res._doc._id.toString(),
                                        creator: user.bind(this, res._doc.creator)
                                        }
                                        
                        return User.findById('5c0d')
                    })
                    .then(user => {
                        if(!user){
                            throw new Error('User not found.')
                        }
                        //or 
                        // user || throw new Error('User not found.')
                        user.createEvent.push(event)
                        return user.save()
                    })
                    .then(res =>{
                        return {...res._doc, _id: res._doc._id.toString()}
                    })
                    .catch(err => { 
                        console.log(err)
                        throw err })
                        //must throw and error that graphql can process
                    
        },
        // end of Create event Resolver __________________________________________

        // Create User Resolver __________________________________________________
        createUser: args =>{
            return User.findOne({email:args.userInput.email})
                        .then(user =>{
                            if(user) throw new Error('User exists already.')

                            return bcrypt.hash(args.userInput.password, 12)
                        })
                                
                        .then(hashedPassword =>{
                            const user = new User({
                                email: args.userInput.email,
                                password: args.userInput.password
                            })
                            return user.save()
                        })
                        .then(res =>{
                            return {... res._doc, password:null,  _id: res.id}    
                        })
                        .catch(err =>{ throw err })
        }
        // end of User Resolver __________________________________________________
        
    },
    graphiql: true
}))

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.rhd9l.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then( _=> app.listen(3000), console.log('connected to dataBase'))
.catch(err => {console.log(err)})

