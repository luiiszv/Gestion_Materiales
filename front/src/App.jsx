import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

// Context
import { AuthProvider } from './context/AuthContext'; 

// Layout
import { UserLayout } from './layouts/UserLayouts'; 

// Pages
import Home from './pages/Home';
import GestionUsuarios from './pages/GestionUsuarios';
import AsignarMateriales from './pages/AsignarMateriales';
import Login from './pages/auth/Login';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path='gestion-usuarios' element={<GestionUsuarios />} />
            <Route path='asignar-materiales' element={<AsignarMateriales />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
