import React, { useState } from 'react'

export const UserContext = React.createContext()

export const UserProviderContext =(props)=>{
    const [user, setUser] = useState({
        token:'marias!',
        user:null,
        tokenExpriration:null,
    })

    const login=()=>{}
    const logout=()=>{}

    return(
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    )
}
