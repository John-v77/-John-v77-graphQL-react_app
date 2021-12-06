const express = require('express')
const bodyParser = require('body-parser')
const {graphqlHTTP} = require('express-graphql')
const {buildSchema} = require('graphql')
const mongoose = require('mongoose')


const app = express()

// mock data to test mutation
const events = [];

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
        events: _=> events,
        createEvent: (args)=>{
            const event ={
                _id: Math.random().toString(),
                title:args.eventInput.title, 
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: args.eventInput.date
            }
            events.push(event)
            // console.log(events)
            return events
        } 
    },
    graphiql: true
}))

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.rhd9l.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then(console.log('connected to dataBase'), _=> app.listen(3000))
.catch(err => {console.log(err)})

