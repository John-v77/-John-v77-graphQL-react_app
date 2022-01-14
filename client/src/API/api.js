import axios from "axios";
import queriesGraphQL from './graphQL-queries'

// const baseURL = process.env.NODE_ENV === 'production'? `https://to be added`:"http://localhost:5000/graphql";

const baseURL = "http://localhost:5000/graphql"

const headers ={
    "content-type":"application/json",
    "Authorization": "<token>"
}





const actions ={
    login: async(data, isLogin) => {

        const queryZ = isLogin ? queriesGraphQL.loginUserQuery(data) : queriesGraphQL.createUserMutation(data)

        let resFromDB = await axios({
            url : baseURL,
            method: 'post',
            headers: headers,
            data : queryZ
        })
        

        // console.log(resFromDB, 'API file login ************')

        // window.localStorage.setItem('token', resFromDB?.data?.token)

        return resFromDB
    },
}


export default actions