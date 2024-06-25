import React from 'react';
import { Link } from 'react-router-dom';


import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { logout } = useAuth()
    return (
        <header className="bg-gray-400 px-4 py-6 flex justify-between items-center rounded-lg">
            <div className="flex items-center">
                <Link className="text-xl font-bold text-gray-800" to="/">
                    GESTION <span className="text-green-500">TECH</span>
                </Link>
            </div>
            <nav className="space-x-4">
                <Link to="/" className="text-black font-semibold hover:text-white">Home</Link>
                <Link to="/gestion-usuarios" className="text-black font-semibold hover:text-white">Gestión Usuarios</Link>
                <Link to="/asignar-materiales" className="text-black font-semibold hover:text-white">Gestión Materiales</Link>
            </nav>
            <div>
                <Link
                    to={'login'}
                    className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                        logout();
                    }}

                >
                    Cerrar Sesión
                </Link>
            </div>
        </header>
    );
}

export default Header;
