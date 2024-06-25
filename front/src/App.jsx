import React from 'react'
import { Route, Routes, BrowserRouter } from "react-router-dom";



//layoput
import { UserLayouts } from './layouts/UserLayouts'


//pages
import Home from "./pages/Home";
import GestionUsuarios from './pages/GestionUsuarios';
import AsignarMateriales from './pages/AsignarMateriales';
import Login from './pages/auth/Login';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/login' element={<Login />} />

        <Route path='/' element={<UserLayouts />}>
          <Route index element={<Home />} />
          <Route path='gestion-usuarios' element={<GestionUsuarios />} />
          <Route path='asignar-materiales' element={<AsignarMateriales />} />


        </Route>


      </Routes>


    </BrowserRouter>
  )
}

export default App