import React, { useEffect, useState } from 'react'



import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';





const GestionUsuarios = () => {

  const { getUsuarios, materiales } = useAuth();
  const [allUsuarios, setAllUsuarios] = useState([])




  useEffect(() => {

    const users = async () => {
      const { data } = await getUsuarios()
      setAllUsuarios(data)
    }
    users();

  }, [])


  return (
    <div className="m-10">

      <div className="w-auto border-s-orange-50 m-5">
        <Link to={'/registrar-usuarios'} className='bg-blue-200 p-2 m-2 rounded-xl hover:bg-green-400'>Registrar Usuarios</Link>
        <Link to={'/registrar-materiales'} className='bg-blue-200 p-2 m-2 rounded-xl hover:bg-green-400'>Registrar Materiales</Link>



      </div>

      <div className="py-5 bg-white rounded-xl overflow-x-auto border">
        <div className="m-5">
          <h1 className='text-2xl my-5'>Usuarios</h1>
          <table className="w-full table-auto ">
            <thead>
              <tr>
                <th className="p-2 border text-lg font-bold text-center">ID</th>
                <th className="p-2 border text-lg font-bold text-center">
                  Nombres
                </th>
                <th className="p-2 border text-lg font-bold text-center">
                  Apellidos
                </th>
                <th className="p-2 border text-lg font-bold text-center">
                  Email
                </th>

                <th className="p-2 border text-lg font-bold text-center">
                  Cargo
                </th>

                <th className="p-2 border text-lg font-bold text-center">
                  Acción
                </th>
              </tr>
            </thead>



            <tbody>
              {allUsuarios.map((user) => (
                <tr key={user.id_usuario}>
                  <td className='p-2 border  text-center'>{user.id_usuario}</td>
                  <td className='p-2 border  text-center'>{user.nombres_usuario}</td>
                  <td className='p-2 border  text-center'>{user.apellidos_usuario}</td>
                  <td className='p-2 border  text-center'>{user.email_usuario}</td>
                  <td className='p-2 border   text-center'>{user.roles_id_rol}</td>
                  <td className='p-2 border   text-center'>{

                    <Link
                    to={`/gestion-admin/editar/usuario/${user.id_usuario}`}
                    className='bg-blue-400 hover:bg-blue-600 px-1 text-white rounded-lg '>Editar</Link>


                  }</td>
                </tr>
              ))}
            </tbody>





          </table>
        </div>
      </div>



      <hr className='my-5 bg-green-500 p-1' />





      <div className="py-5 bg-white rounded-xl overflow-x-auto border">
        <div className="m-5">
          <h1 className='text-2xl my-5'>Materiales</h1>
          <table className="w-full table-auto ">
            <thead>
              <tr>
                <th className="p-2 border text-lg font-bold text-center">ID</th>
                <th className="p-2 border text-lg font-bold text-center">
                  Nombre
                </th>
                <th className="p-2 border text-lg font-bold text-center">
                  Descripcion Material
                </th>

                <th className="p-2 border text-lg font-bold text-center">
                  Acción
                </th>
              </tr>
            </thead>



            <tbody>
              {materiales.map((mat) => (
                <tr key={mat.id_material}>
                  <td className='p-2 border  text-center'>{mat.id_material}</td>
                  <td className='p-2 border  text-center'>{mat.nombre}</td>
                  <td className='p-2 border  text-center'>{mat.descripcion_material}</td>
                  <td className='p-2 border   text-center'>{

                    <Link
                    to={`/gestion-admin/editar/material/${mat.id_material}`}
                   
                    className='bg-blue-400 hover:bg-blue-600 px-1 text-white rounded-lg '>Editar</Link>


                  }</td>
                </tr>
              ))}
            </tbody>





          </table>
        </div>
      </div>
    </div>
  )
}

export default GestionUsuarios