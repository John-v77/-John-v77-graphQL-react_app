const {buildSchema} = require('graphql')


// /the below schema is in a string

module.exports = buildSchema(`
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
    }
`)