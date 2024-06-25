import React, { useState } from 'react';

import { useForm } from "react-hook-form";

//useContext
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { loginAuth } = useAuth();
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async(values) => {

    await loginAuth(values);

    

  })




  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-screen-lg xl:grid grid-cols-2 gap-4 p-6 bg-white rounded-lg shadow-lg border">

        <form onSubmit={onSubmit} className="flex flex-col">
          <h1 className="font-bold text-center text-3xl mb-6">Iniciar Sesión</h1>
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
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-lg">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border rounded px-4 py-2 text-lg"
              {...register('password', { required: true })}
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-3 rounded-lg text-lg">
            Iniciar Sesión
          </button>
        </form>
        <div className="hidden xl:flex justify-center items-center">
          <h1 className='text-4xl'> GESTION <span className="text-green-500">TECH</span></h1>
        </div>
      </div>
    </div>
  );
}

export default Login;
