import React, { useEffect, useState } from 'react'



import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';





const GestionUsuarios = () => {

  const { getUsuarios } = useAuth();
  const [allUsuarios, setAllUsuarios] = useState([])




  useEffect(() => {

    const users = async () => {
      const { data } = await getUsuarios()
      setAllUsuarios(data)
    }
    users();

  }, [])


  return (
    <div className="mb-5">

      <div className="w-full border-s-orange-50 m-5">
        <Link to={'/registrar-usuarios'} className='bg-blue-200 p-2 m-2 rounded-xl hover:bg-green-400'>Registrar Usuarios</Link>
        <Link className='bg-blue-200 p-2 m-2 rounded-xl hover:bg-green-400'>Registrar Materiales</Link>



      </div>

      <div className="py-5 bg-white rounded-xl overflow-x-auto border">
        <div className="m-5">
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
                  <td className='p-2 border font-bold text-center'>{user.id_usuario}</td>
                  <td className='p-2 border font-bold text-center'>{user.nombres_usuario}</td>
                  <td className='p-2 border font-bold text-center'>{user.apellidos_usuario}</td>
                  <td className='p-2 border font-bold text-center'>{user.email_usuario}</td>
                  <td className='p-2 border  font-bold text-center'>{user.roles_id_rol}</td>
                  <td className='p-2 border  font-bold text-center'>{'Accion'}</td>
                </tr>
              ))}
            </tbody>





          </table>
        </div>
      </div>



      <div className="">





      </div>
    </div>
  )
}

export default GestionUsuarios