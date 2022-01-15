import axios from "axios";
import queriesGraphQL from './graphQL-queries'

// const baseURL = process.env.NODE_ENV === 'production'? `https://to be added`:"http://localhost:5000/graphql";

const baseURL = "http://localhost:5000/graphql"

const headers ={
    "content-type":"application/json",
    "Authorization": "<token>"
}



const actions ={

    //Login API call
    login: async(data, isLogin) => {

        const queryZ = isLogin ? queriesGraphQL.loginUserQuery(data) : queriesGraphQL.createUserMutation(data)

        let resFromDB = await axios({
            url : baseURL,
            method: 'post',
            headers: headers,
            data : queryZ
        })
        return resFromDB
    },

    //Create Events API call
    createEvent: async(data, token) => {

        const newHeader ={
            "content-type":"application/json",
            "Authorization": 'Bearer ' + token
        }

        let resFromDB = await axios({
            url : baseURL,
            method: 'post',
            headers: newHeader,
            data : queriesGraphQL.createEventMutation(data)
        })
        return resFromDB

    },

    fetchEvents: async()=>{
        let resFromDB = await axios({
            url : baseURL,
            method: 'post',
            headers: headers,
            data : queriesGraphQL.fetchEventsQuery
        })
        return resFromDB
    }
}


export default actions