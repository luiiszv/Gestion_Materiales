import React from 'react'

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useAuth } from "../context/AuthContext";

const RegistrarMateriales = () => {

    const navigate = useNavigate()


    const { register, handleSubmit } = useForm()
    const { registrarMaterialesUsuarios } = useAuth()




    const onSubmit = handleSubmit(async (values) => {



        const res = await registrarMaterialesUsuarios(values);

        
        if (res.status == 200) {
            alert('Material Registrado');
        

            setTimeout(() => {
                navigate('/gestion-admin');
            }, 1000);
        }
        





    })






    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-screen-lg xl:grid grid-cols-2 gap-4 p-6 bg-white rounded-lg shadow-lg border">

                <form onSubmit={onSubmit} className="flex flex-col">
                    <h1 className="font-bold text-center text-3xl mb-6">Registrar Materiales</h1>


                    <div className="mb-6">
                        <label htmlFor="Nombre Material" className="block mb-2 text-lg">Nombre Material:</label>
                        <input
                            type="Nombre Material"
                            id="Nombre Material"
                            name="Nombre Material"
                            className="w-full border rounded px-4 py-2 text-lg"
                            {...register('nombreMaterial', { required: true })}

                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="descripcion_material" className="block mb-2 text-lg">Descripcion Material:</label>
                        <input
                            type="descripcion_material"
                            id="descripcion_material"
                            name="descripcion_material"
                            className="w-full border rounded px-4 py-2 text-lg"
                            {...register('descripcion_material', { required: true })}

                        />
                    </div>


                    <button type="submit" className="bg-green-500 text-white font-bold py-3 px-3 rounded-lg text-lg">
                        Registrar
                    </button>

                    <Link to={'/gestion-admin'} type="submit" className="bg-green-400 text-white font-bold py-3 px-3 rounded-lg text-lg mt-5 text-center">
                        Volver
                    </Link>
                </form>
                <div className="hidden xl:flex justify-center items-center">
                    <h1 className='text-4xl'> GESTION <span className="text-green-500">TECH Materiales</span></h1>
                </div>
            </div>
        </div>
    )
}

export default RegistrarMateriales
