import React from 'react';
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from '../components/Header';

export const UserLayout = () => {
    const { user, loading, isAuthenticated } = useAuth();

    if (loading) return <h1>Loading...</h1>;

    if (!loading && !isAuthenticated) return <Navigate to='/login' replace />;



    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
};
