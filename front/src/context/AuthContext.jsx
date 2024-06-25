import React, { useContext, useState, createContext, useEffect } from 'react'
import Cookies from "js-cookie";
import { login, verify } from "../Api/userApi.js";


const AuthContext = createContext()


export const useAuth = () => {

    const contexto = useContext(AuthContext);

    if (!contexto) {
        throw new Error("Algo esta mal en AuthContex")
    }

    return contexto;


}



export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [auth, setAuth] = useState(false)


    const logout = async () => {


        Cookies.remove("token");
        auth(false);
        setUser(null);



    }


    const loginAuth = async (data) => {


        
        try {
            const response = await login(data)
            if (response.data) {
                setAuth(true);
                setUser(response.data);

                return response;
            }


        } catch (error) {

            return error.response;

        }










    }

    useEffect(() => {
        const verificarFrontToken = async () => {

            const res = await verify();
            const cookies = Cookies.get();



            if (!cookies.token) {
                setUser(null);
                setAuth(false);

                return

            }

            try {
                if (res.data) {

                    setUser(res.data)
                    setAuth(true)
                }

                else {
                    setUser(null);
                    setAuth(false)


                }

            } catch (error) {
                setUser(null);
                setAuth(false)


            }

        }

        verificarFrontToken();

    }, [])



    return (
        <AuthContext.Provider value={{ loginAuth, user, auth, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
