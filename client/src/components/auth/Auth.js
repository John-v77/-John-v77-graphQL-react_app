import React, { useContext, useState } from 'react';
import axios from 'axios'
import './auth.css';
import {UserContext} from '../../context/auth-context'

function Auth(props) {

    const [loginObj, setLoginObj] = useState({})
    const [stateLogin, setStateLogin] = useState(true)

    const [user, setUser] = useContext(UserContext)

    console.log(user)

    const switchMode =(e)=>{

        e.preventDefault()
        setStateLogin(!stateLogin)

        console.log(stateLogin)
    }

    const recordVal = (e)=>{
        setLoginObj({...loginObj, [e.target.name] : e.target.value})
        console.log('loginObj', loginObj)}



    const sendReq = (e)=>{
        e.preventDefault()
        if (loginObj.username.trim().length === 0 ||
            loginObj.password.trim().length === 0) return

        const endpoint = 'http://localhost:5000/graphql'
        const headers ={
            "content-type":"application/json",
            "Authorization": "<token>"
        }

        // GraphQl query for Loging in the user
        const LoginUserQuery ={
            query:`
                query{
                    login(email: "${loginObj.username}", password:"${loginObj.password}")
                }
            `
        }

        // GraphQl mutation creating the user
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
            data: stateLogin ? createUserQuery : LoginUserQuery
            })
            .then((res) => {
                if(res.status !==200 && res.status !==201)  {throw new Error('Failed')}
                return res
            })
            .then(resData => {
                if(resData.data.data.login.token){
                    // console.log('token present')
                    setUser({
                        token:              resData.data.data.login.token,
                        userId:             resData.data.data.login.userId,
                        tokenExpriration :  resData.data.data.login.token
                    })
                }
                console.log(resData)
            })
            .catch((err) => console.log(err)) 
    }

    return (
        <div className='login-page'>
            <h1>{stateLogin ? 'Register' : 'Login'}</h1>
            <form onSubmit={sendReq} className='login-form'>
                <label>username</label>
                    <input onChange={recordVal} type={'text'} placeholder='username' name='username'/>
                
                <label>password</label>
                    <input onChange={recordVal} type={'text'} placeholder='password' name='password'/>
                
                <button type='submit'>{stateLogin ? 'Register' : 'Login'}</button>
                <button type='button' onClick={switchMode}>Switch to {stateLogin ? 'Login' : 'Register'}</button>
            </form>
        </div>
    );
}

export default Auth;