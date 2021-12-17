import React, { useState } from 'react';
import axios from 'axios'
import './auth.css';
function Auth(props) {

    const [loginObj, setLoginObj] = useState({})

    const recordVal = (e)=>{
        setLoginObj({...loginObj, [e.target.name] : e.target.value})
        console.log('loginObj', loginObj)}


    const requestBody = `mutation: createUser(userInput: {email: "${loginObj.username}", password:"${loginObj.password}"}){
            _id
            email
        }`
    

    const sendReq = (e)=>{
        e.preventDefault()
        if (loginObj.username.trim().length === 0 ||
            loginObj.password.trim().length === 0) return

        const endpoint = 'http://localhost:5000/graphql'
        const headers ={
            "content-type":"application/json",
            "Authorization": "<token>"
        }

        const graphqlQuery = {
            "operation":"fetchAuthor",
            "query": requestBody,
            "variables":{}
        }

        const LoginUserQuery ={
            query:`
                query{
                    login(email: "${loginObj.username}", password:"${loginObj.password}")
                }
            `
        }


        const createUserQuery={
            query:`
                mutation{
                    createUser(userInput: {email:"${loginObj.username}", password:"${loginObj.password}"})
                }
            `
        }

        axios({
            url : endpoint,
            method: 'post',
            headers: headers,
            data: createUserQuery
            })
            .then((res) => {
                if(res.status !==200 && res.status !==201)  {throw new Error('Failed')}
                return res
            })
            .then(resData => {
                console.log(resData)
            })
            .catch((err) => console.log(err)) 
    }

    return (
        <div className='login-page'>
            <h1>Login</h1>
            <form onSubmit={sendReq} className='login-form'>
                <label>username</label>
                    <input onChange={recordVal} type={'text'} placeholder='username' name='username'/>
                
                <label>password</label>
                    <input onChange={recordVal} type={'text'} placeholder='password' name='password'/>
                
                <button type='submit'>Login</button>
            </form>
        </div>
    );
}

export default Auth;