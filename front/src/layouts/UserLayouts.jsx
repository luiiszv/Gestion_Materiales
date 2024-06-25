import React from 'react';
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from '../components/Header';

export const UserLayout = () => {
    const { user, auth } = useAuth();

    

    if (!auth && !user) return <Navigate to='/login' replace />;

    console.log(auth, user);

    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};
