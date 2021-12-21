import React, { useState } from 'react'

export const UserContext = React.createContext()

export const UserProviderContext =(props)=>{
    const [user, setUser] = useState({
        token:null,
        user:'test',
    })

    const login=()=>{}
    const logout=()=>{}

    return(
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
}
