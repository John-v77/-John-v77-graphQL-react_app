const queriesGraphQL= {
    
    // #1. GraphQl query for Loging in the user
    loginUserQuery : (data) => {
        return {
                    query:`
                        query{
                            login(email: "${data.username}", password:"${data.password}"){
                                userId
                                token
                                tokenExpiration
                            }
                        }
                    `
        }
    },

    // #2. GraphQl mutation creating the user
    createUserMutation : (data) => {
        return {
                    query:`
                        mutation{
                            createUser(userInput: {email:"${data.username}", password:"${data.password}"}){
                                _id
                                email
                            }
                        }
                    `
        }
    },

    // #3. GraphQl query for fetching the events
    fetchEventsQuery : {
                query:`
                    query{
                        events{
                            _id
                            title
                            description
                            date
                            price
                            creator{
                                _id
                                email
                            }
                        }
                    }
                `
    },
    

    // #4. GraphQl mutation for creating events
    createEventMutation  : (data) => {
        return {
                    query:`
                        mutation{
                            createEvent(eventInput: {title:"${data.title}", 
                                                    price:${+data.price},
                                                    date:"${data.date}",
                                                    description:"${data.description}",
                                                    }) {
                                                        _id
                                                        title
                                                        description
                                                        date
                                                        price
                                                        creator{
                                                            _id
                                                            email
                                                        }
                                                    }
                        }
                            `
        }
    },

    // #5. GraphQl mutation for fetching booked events
    fetchedBookedEventQuery : {
        query:`
            query {
                bookings {
                _id
                createdAt
                    event {
                        _id
                        title
                        date
                    }
                }
            }
        `
    },

    // #6. GraphQl mutation for booking events
    bookEventMutation : (data) => {
        return {
            query:`
                mutation{
                    bookEvent(eventId:"${data.eventId}"){
                        _id
                        createdAt
                        updatedAt
                    }
                }
            `
        }
    }
}

export default queriesGraphQL