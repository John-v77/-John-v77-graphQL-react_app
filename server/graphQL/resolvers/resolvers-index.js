const authResolver = require('./auth')
const eventsResolver = require('./events')
const bookingResolver = require('./booking')

//the names of the resolvers have be unique, and don't clash, they will be used in graphQl Schema
const rootResolver ={
    ...authResolver,
    ...eventsResolver,
    ...bookingResolver
}

module.exports = rootResolver