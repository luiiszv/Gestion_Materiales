import React, { useContext, useState, createContext } from 'react'

import { login } from "../Api/userApi.js";

const AuthContext = createContext()


export const useAuth = () => {

    const contexto = useContext(AuthContext);

    if (!contexto) {
        throw new Error("Algo esta mal en AuthContex")
    }

    return contexto;


}



export const AuthProvider = ({ children }) => {

    const loginAuth = async (data) => {
        const res = await login(data)
        console.log(res)

    }








    return (
        <AuthContext.Provider value={{ loginAuth }}>
            {children}
        </AuthContext.Provider>
    );
}
