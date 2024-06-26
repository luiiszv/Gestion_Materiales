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
import RegistrarUsuarios from './pages/RegistrarUsuarios';
import RegistrarMateriales from './pages/RegistrarMateriales';
import EditarUsuario from './pages/EditarUsuario';
import Error from './pages/auth/Error';
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route  path='/login' element={<Login />} />
          
          <Route path='/' element={<UserLayout />}>
            <Route index element={<Home />} />


            <Route path='gestion-admin' element={<GestionUsuarios />} />
            <Route path='registrar-usuarios' element={<RegistrarUsuarios />} />
            <Route path='gestion-admin/editar/usuario/:id' element={<EditarUsuario />} />


            <Route path='asignar-materiales' element={<AsignarMateriales />} />
            <Route path='registrar-materiales' element={<RegistrarMateriales />} />

          </Route>

          <Route path="*" element={<Error/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
