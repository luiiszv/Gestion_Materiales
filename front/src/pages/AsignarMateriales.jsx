

import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';

const AsignarMateriales = () => {

  const { register, setValue, handleSubmit, formState: { errors }, reset } = useForm();
  const [allUsuarios, setAllUsuarios] = useState([])

  const [estudiantes, setEstudiantes] = useState([]);


  const { user, materiales, getUsuarios, getAllEstiduantes, asignaciones, asignarMaterial } = useAuth();







  useEffect(() => {

    const users = async () => {
      const { data } = await getUsuarios()
      setAllUsuarios(data)
    }
    users();
    setValue('repartidor_id', user.nombres_usuario)


    const getEst = async () => {
      const res = await getAllEstiduantes();
      setEstudiantes(res)

    }
    getEst();

  }, [])




  const onSubmit = handleSubmit(async (values) => {
    console.log(values)

    const res= await asignarMaterial(values);
    if(res.status==200){
      reset();
      alert("Material Asignado")
    }

  })




  return (
    <div className="py-5 bg-white rounded-xl overflow-x-auto border">


      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-screen-lg xl:grid grid-cols-2 gap-4 p-6 bg-white rounded-lg shadow-lg border">

          <form onSubmit={onSubmit} className="flex flex-col">
            <h1 className="font-bold text-center text-3xl mb-6">Asignar Materiales</h1>

            <div className="mb-6">
              <label htmlFor="repartidor_id" className="block mb-2 text-lg">Repartidor:</label>
              <input
                disabled
                type="repartidor_id"
                id="repartidor_id"
                name="repartidor_id"

                className="w-full border rounded px-4 py-2 text-lg"
                {...register('repartidor_id', { required: true })}

              />
            </div>

            <div className="mb-6">
              <label htmlFor="repartidor_id" className="block mb-2 text-lg">Estudiantes:</label>
              <select

                type="repartidor_id"
                id="repartidor_id"
                name="repartidor_id"
                className="w-full border rounded px-4 py-2 text-lg"
                {...register('estudiante_id', { required: true })}



              >
                <option value="">Selecciona un Estudiante</option>
                {estudiantes.map((est) => (
                  <option key={est.id_usuario} value={est.id_usuario} >{est.nombres_usuario}</option>
                ))}


              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="repartidor_id" className="block mb-2 text-lg">Materiales:</label>
              <select

                type="Materiales"
                id="Materiales"
                name="Materiales"

                className="w-full border rounded px-4 py-2 text-lg"
                {...register('id_material', { required: true })}



              >
                <option value="">Selecciona un Material</option>
                {materiales.map((mat) => (
                  <option key={mat.id_material} value={mat.id_material} >{mat.nombre}</option>
                ))}


              </select>
            </div>


            <div className="mb-6">
              <label htmlFor="Cantidad" className="block mb-2 text-lg">Cantidad:</label>
              <input
                type="number"
                id="Cantidad"
                name="Cantidad"
                className="w-full border rounded px-4 py-2 text-lg outline-none focus:border-blue-500"
                {...register('cantidad', { required: true, min: 1, message: "Cantidad debe ser mayor de 0" })}
              />

              {errors.cantidad && (
                <p className="text-red-500">
                  {errors.cantidad.message}
                </p>
              )}
            </div>


            <div className="mb-6">
              <label htmlFor="repartidor_id" className="block mb-2 text-lg">Estado:</label>
              <select

                type="Estado"
                id="Estado"
                name="Estado"
                className="w-full border rounded px-4 py-2 text-lg"
                {...register('estado_material', { required: true })}



              >
                <option value={""} >Seleccione</option>
                <option key={1} value={1} >Entregado</option>
                <option key={2} value={2} >No Entregado</option>




              </select>
            </div>
            <button type="submit" className="bg-green-500 text-white font-bold py-3 px-3 rounded-lg text-lg">
              Asignar
            </button>
          </form>
          <div className="hidden xl:flex justify-center items-center">
            <h1 className='text-4xl'> GESTION <span className="text-green-500">TECH</span></h1>
          </div>
        </div>
      </div>
      <hr />



      <div className="m-5">
        <h1 className='text-2xl my-5'>Info Entregas</h1>
        <table className="w-full table-auto ">
          <thead>
            <tr>
              <th className="p-2 border text-lg font-bold text-center">ID</th>
              <th className="p-2 border text-lg font-bold text-center">Fecha</th>

              <th className="p-2 border text-lg font-bold text-center">
                Material
              </th>
              <th className="p-2 border text-lg font-bold text-center">
                Repartidor
              </th>
              <th className="p-2 border text-lg font-bold text-center">
                Estudainte
              </th>
              <th className="p-2 border text-lg font-bold text-center">
                Estado
              </th>


            </tr>
          </thead>



          <tbody>
            {asignaciones.map((asignaciones) => (
              <tr key={asignaciones.id_asignaciones}>
                <td className='p-2 border text-center'>{asignaciones.id_asignaciones}</td>
                <td className='p-2 border  text-center'>{asignaciones.fecha}</td>

                <td className='p-2 border  text-center'>{asignaciones.material}</td>
                <td className='p-2 border  text-center'>{asignaciones.repartidor}</td>
                <td className='p-2 border  text-center'>{asignaciones.estudiante}</td>
                <td className='p-2 border  text-center'>{asignaciones.estado_material}</td>



              </tr>
            ))}
          </tbody>





        </table>
      </div>

      <hr />



      <div className="m-5">
        <h1 className='text-2xl my-5'>Info Materiales</h1>
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


            </tr>
          </thead>



          <tbody>
            {materiales.map((mat) => (
              <tr key={mat.id_material}>
                <td className='p-2 border  text-center'>{mat.id_material}</td>
                <td className='p-2 border  text-center'>{mat.nombre}</td>
                <td className='p-2 border  text-center'>{mat.descripcion_material}</td>


              </tr>
            ))}
          </tbody>





        </table>
      </div>
    </div>
  )
}

export default AsignarMateriales