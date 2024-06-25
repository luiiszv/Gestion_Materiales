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
    const [auth, setAuth] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const logout = async () => {
        Cookies.remove("token");
        setAuth(false);
        setUser(null);
        setIsAuthenticated(false);
    };

    const loginAuth = async (data) => {
        try {
            const response = await login(data);
            if (response.data) {
                setAuth(true);
                setUser(response.data);
                setIsAuthenticated(true);
                return response;
            }
        } catch (error) {
            return error.response;
        }
    };

    useEffect(() => {
        const verificarFrontToken = async () => {
            const res = await verify();
            const cookies = Cookies.get();
            console.log(cookies.token, res);

            if (!cookies.token) {
                setUser(null);
                setAuth(false);
                setIsAuthenticated(false);
                return;
            }

            try {
                if (res.data) {
                    setUser(res.data);
                    setAuth(true);
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setAuth(false);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.log(error);
                setUser(null);
                setAuth(false);
                setIsAuthenticated(false);
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
        <AuthContext.Provider value={{ loginAuth, getUsuarios, user, auth, logout, isAuthenticated, roles }}>
            {children}
        </AuthContext.Provider>
    );
};
