const express = require('express')
const bodyParser = require('body-parser')
const {graphqlHTTP} = require('express-graphql')
const {buildSchema} = require('graphql')
const mongoose = require('mongoose')
const Event = require('./models/event')

const app = express()

app.use(bodyParser.json())

app.use('/graphql', graphqlHTTP({
    // /the below schema is in a string
    schema: buildSchema(`
        type Event {
            _id:ID!
            title:String!
            description:String!
            price:Float!
            date:String!
        }

        input EventInput {
            title:String!
            description:String!
            price:Float!
            date:String!
        }
    
        type RootQuery {
            events:[Event!]!
        }

        type RootMutation{
            createEvent(eventInput : EventInput):[String]
        }
        schema {
            query   :   RootQuery
            mutation:   RootMutation
        }`),
    rootValue: {
        events: _=> {
            return Event.find()
            // return is for async await
                .then(ev => {
                    return ev.map(event => {
                        return {...event._doc}
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
                date: new Date(args.eventInput.date)
            });

            /* must return the event here, for graphQL to know that resolver executes an async operation
               and wait for it before it continues with the code bellow */
            return event
                    .save()
                    // save() is provided by the mongoose package
                    .then(res => {
                        console.log(res)
                        return {...res._doc}
                        /* this return .. will leave the meta date behind from the object, 
                        and will return the new added event, using '._doc' */ 
                    })
                    .catch(err => { throw err })
                        //must throw and error that graphql can process
                    
        }
        // end of Create event Resolver __________________________________________
    },
    graphiql: true
}))

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.rhd9l.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then( _=> app.listen(3000), console.log('connected to dataBase'))
.catch(err => {console.log(err)})

