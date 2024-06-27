import React, { useEffect } from 'react'


import { useForm } from "react-hook-form";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const EditarUsuario = () => {

    const { id } = useParams();

    const { roles, editarUsuario, obtenerOneUsuario } = useAuth()

    const { register, handleSubmit, setValue } = useForm();

    const navigate = useNavigate();


    useEffect(() => {


        const obtUser = async () => {

            const res = await obtenerOneUsuario(id)

            const { data } = res;



            if (res.status == 200) {
                setValue('nombres', data.nombres_usuario)
                setValue('apellidos', data.apellidos_usuario)
                setValue('rol', data.roles_id_rol)
                setValue('email', data.email_usuario)

            }


        }

        obtUser();

    }, [])




    const onSubmit = handleSubmit(async (values) => {



        const res= await editarUsuario(id, values)


        if (res.status == 200) {
            alert('Usuario Editado');


            setTimeout(() => {
                navigate('/gestion-admin');
            }, 1000);
        }






    })
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-screen-lg xl:grid grid-cols-2 gap-4 p-6 bg-white rounded-lg shadow-lg border">

                <form onSubmit={onSubmit} className="flex flex-col">
                    <h1 className="font-bold text-center text-3xl mb-6">Editar Usuario</h1>


                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-lg">Nombre(s):</label>
                        <input
                            type="Nombres"
                            id="Nombres"
                            name="Nombres"
                            className="w-full border rounded px-4 py-2 text-lg"
                            {...register('nombres', { required: true })}

                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-lg">Apellido(s):</label>
                        <input
                            type="Apellidos"
                            id="Apellidos"
                            name="Apellidos"
                            className="w-full border rounded px-4 py-2 text-lg"
                            {...register('apellidos', { required: true })}

                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-lg">Rol:</label>

                        <select
                            id="Rol"
                            name="Rol"
                            className="w-full border rounded px-4 py-2 text-lg"
                            {...register('rol', { required: true })}>

                            <option value="" disabled>Selecciona</option>
                            {roles.map(rol => (

                                <option key={rol.id_rol} value={rol.id_rol}>{rol.nombre_rol} </option>
                            ))

                            }


                        </select>



                    </div>



                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-lg">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full border rounded px-4 py-2 text-lg"
                            {...register('email', { required: true })}

                        />
                    </div>
                    {/* <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-lg">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full border rounded px-4 py-2 text-lg"
                            {...register('password', { required: true })}
                        />
                    </div> */}
                    <button type="submit" className="bg-green-500 text-white font-bold py-3 px-3 rounded-lg text-lg">
                        Editar
                    </button>

                    <Link to={'/gestion-admin'} type="submit" className="bg-green-400 text-white font-bold py-3 px-3 rounded-lg text-lg mt-5 text-center">
                        Volver
                    </Link>
                </form>
                <div className="hidden xl:flex justify-center items-center">
                    <h1 className='text-4xl'> GESTION <span className="text-green-500">TECH</span></h1>
                </div>
            </div>
        </div>
    )
}

export default EditarUsuario
