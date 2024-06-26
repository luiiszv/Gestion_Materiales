import React, { useContext, useState, createContext, useEffect } from 'react';
import Cookies from "js-cookie";
import { login, verify, getUsers } from "../Api/userApi.js";
import { getRoles } from "../Api/rolesApi.js";


const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Algo está mal en AuthContext");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const logout = async () => {
        Cookies.remove("token");
        setLoading(false);
        setUser(null);
        setIsAuthenticated(false);
    };

    const loginAuth = async (data) => {
        try {
            const response = await login(data);
            if (response.data) {
                setLoading(false);
                setUser(response.data);
                setIsAuthenticated(true);
                return response;
            }
        } catch (error) {
            return error.response;
        }
    };

    useEffect(() => {
        async function verificarFrontToken() {
            
            
           
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                setUser(null);
                return setUser(null);
            }

            const res = await verify();

           

            try {
                if (!res.data) {
                    
                    setLoading(false);

                    setIsAuthenticated(false);
                }
                setUser(null);


                setIsAuthenticated(true);
                setUser(res.data)
                setLoading(false)

            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setUser(null)
                setLoading(false)

            } 
        };

        verificarFrontToken();
    }, []);


    useEffect(() => {

        const getAllRoles = async () => {
            const res = await getRoles();
            setRoles(res.data);

        }

        getAllRoles();

    }, [])

    const getUsuarios = async () => {
        try {
            const res = await getUsers();
            return res;
        } catch (error) {
            return error.response;
        }
    };

    return (
        <AuthContext.Provider value={{ loginAuth, getUsuarios, user, loading, logout, isAuthenticated, roles }}>
            {children}
        </AuthContext.Provider>
    );
};
