const express = require('express')
const bodyParser = require('body-parser')
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose')

const graphQLSchema = require('./graphQL/schema/schema-index')
const graphQLResolvers = require('./graphQL/resolvers/resolvers-index')


const app = express()

app.use(bodyParser.json())



app.use('/graphql', graphqlHTTP({
    // /the below schema is in a string
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true
}))

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.rhd9l.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then( _=> app.listen(3000), console.log('connected to dataBase'))
.catch(err => {console.log(err)})

