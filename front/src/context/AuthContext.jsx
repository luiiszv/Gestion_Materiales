import React, { useContext, useState, createContext, useEffect } from 'react';
import Cookies from "js-cookie";
import { login, verify, getUsers, registerUsers, getEstudiantes } from "../Api/userApi.js";
import { getRoles } from "../Api/rolesApi.js";

import { getAllAsign, asignarMateriales } from "../Api/asignacionesApi.js";
import { useLocation } from "react-router-dom";

import { getMateriales, registerMateriales, getMisMateriales } from "../Api/materialesApi.js";


const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Algo está mal en AuthContext");
    }
    return context;
};

export const AuthProvider = ({ children }) => {

    
    let location = useLocation()
    const [roles, setRoles] = useState([]);
    const [materiales, setMateriales] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    const [asignaciones, setAsignaciones] = useState([])



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




            try {
                const res = await verify();

                if (!res.data) {

                    setLoading(false);
                    setIsAuthenticated(false);
                    setUser(null);
                }



                setIsAuthenticated(true);
                setUser(res.data)
                setLoading(false)

            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setUser(null)
                setLoading(false)

            } finally {
                setLoading(false);
            }
        };

        verificarFrontToken();
    }, [location.pathname]);

    const getAllRoles = async () => {
        const res = await getRoles();
        setRoles(res.data);

    }

    const getAllMateriales = async () => {
        const res = await getMateriales();

        setMateriales(res.data);

    }



    const getAllEstiduantes = async () => {
        const res = await getEstudiantes();
        return res.data;
    }


    const todasAsignaciones = async () => {

        const { data } = await getAllAsign()
        setAsignaciones(data);



    }

    const asignarMaterial = async (data) => {

        const res = await asignarMateriales(data);
        todasAsignaciones();
        return res;

    }


    const obtenerMisMateriales = async () => {

        const res = await getMisMateriales();

        return res.data


    }




    useEffect(() => {
        todasAsignaciones();
       


        getAllRoles();


        getAllMateriales();



    }, [location.pathname])

    const getUsuarios = async () => {
        try {
            const res = await getUsers();
            return res;
        } catch (error) {
            return error.response;
        }
    };


    const registrarUsuarios = async (data) => {
        console.log(data)

        try {
            const res = await registerUsers(data);
            return res;

        } catch (error) {
            console.log(error.response);

        }

    }

    const registrarMaterialesUsuarios = async (data) => {

        try {
            const res = await registerMateriales(data)
            getAllMateriales();
            return res;



        } catch (error) {
            console.log(error)
            return error.response

        }

    }

    return (
        <AuthContext.Provider value={{ getAllEstiduantes, asignarMaterial, obtenerMisMateriales, asignaciones, loginAuth, getUsuarios, user, loading, logout, isAuthenticated, roles, registrarUsuarios, materiales, registrarMaterialesUsuarios }}>
            {children}
        </AuthContext.Provider>
    );
};
