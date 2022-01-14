import React, { useContext, useState } from 'react';
import axios from 'axios'
import './auth.css';
import { UserContext } from '../../aux-components/context/auth-context';
import actions from '../../../API/api'

function Auth(props) {

    const [loginObj, setLoginObj] = useState({})
    const [stateLogin, setStateLogin] = useState(true)

    const [user, setUser] = useContext(UserContext)    // "user" is need it for "setUser" line 80 - do not delete

    // console.log(user)

    const switchMode =(e)=>{

        e.preventDefault()
        setStateLogin(!stateLogin)

        // console.log(stateLogin)
    }

    const recordVal = (e)=>{
        setLoginObj({...loginObj, [e.target.name] : e.target.value})
        // console.log('loginObj', loginObj)
    }



    const sendReq = (e)=>{
        e.preventDefault()
        if (loginObj.username.trim().length === 0 ||
            loginObj.password.trim().length === 0) return


        actions.login(loginObj, stateLogin)

                .then((res) => {
                    if(res.status !==200 && res.status !==201)  {throw new Error('Failed')}
                    return res
                })
                
                .then(resData => {
                    if(resData.data.data.login.token){
                        console.log('token present')
                        setUser({
                            token:              resData.data.data.login.token,
                            userId:             resData.data.data.login.userId,
                            tokenExpriration :  resData.data.data.login.token
                        })
                    }
                    console.log(resData.data.data)
                })
                .catch((err) => console.log(err)) 
    }

    return (
        <div className='login-page'>
            <h1>{stateLogin ? 'Login' : 'Register'}</h1>
            <form onSubmit={sendReq} className='login-form'>
                <label>username</label>
                    <input onChange={recordVal} type={'text'} placeholder='username' name='username'/>
                
                <label>password</label>
                    <input onChange={recordVal} type={'text'} placeholder='password' name='password'/>
                
                <button type='submit'>{stateLogin ? 'Login' : 'Register'}</button>
                <button type='button' onClick={switchMode}>Switch to {stateLogin ? 'Register' : 'Login' }</button>
            </form>
        </div>
    );
}

export default Auth;