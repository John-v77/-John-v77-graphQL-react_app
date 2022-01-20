const queriesGraphQL= {
    
    // #1. GraphQl query for Loging in the user
    loginUserQuery : (data) => {
        return {
                    query:`
                        query Login($email: String!, $password: String!){
                            login(email: $email, password: $password ){
                                userId
                                token
                                tokenExpiration
                            }
                        }
                    `,
                    variables:{
                        email:data.username ,
                        password: data.password
                    }
        }
    },


    // #2. GraphQl mutation creating the user
    createUserMutation : (data) => {
        return {
                    query:`
                        mutation CreateUser($email: String!, $password: String!){
                            createUser(userInput: {email:$email, password:$password}){
                                _id
                                email
                            }
                        }
                    `,
                    variables:{
                        email:data.username ,
                        password:data.password
                    }
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
                        mutation CreateEvent(
                            $title: String!", 
                            $price: Float!,
                            $date: String!,
                            $description: String!"
                        ){
                            createEvent(eventInput: {title: $title, 
                                                    price: $price,
                                                    date: $date,
                                                    description: $description,
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
                    `,

                    variables:{
                        title: data.title,
                        desc: +data.price,
                        price: data.date,
                        date: data.description
                    }
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
                mutation BookEvent($id: String!){
                    bookEvent(eventId:$id){
                        _id
                        createdAt
                        updatedAt
                    }
                }
            `,
            
            variables:{
                id:data
            }
        }
    },


    
    // #7. GraphQl mutation canceling booked events
    cancelEventMutation : (data) => {
        return {
          query:`
              mutation cancelBooking($id: ID!){
                cancelBooking(eventId:$id){
                      _id
                      title
                  }
              }
          `,
          variables:{
              id: data
          }
      }
  }
}

export default queriesGraphQL