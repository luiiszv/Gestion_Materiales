import React, { useContext, useState, createContext } from 'react'


const AuthContext = createContext()


export const usarAuth = () => {

    const contexto = useContext(AuthContext);

    if (!contexto) {
        throw new Error("Algo esta mal en AuthContex")
    }


}



const AuthProvedor = ({ children }) => {
    




    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext