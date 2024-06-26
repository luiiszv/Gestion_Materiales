import React, { useEffect, useState } from 'react';
import { useAuth } from "../context/AuthContext";
const Home = () => {

    const [misMateriales, setMisMateriales] = useState([])

    const { obtenerMisMateriales } = useAuth()

    useEffect(() => {

        const misMateriales = async () => {

            const res = await obtenerMisMateriales();
            setMisMateriales(res)
            

        }
        misMateriales();

    }, []);

 
    return (

        <div className="">
            <div className="bg-yellow-300 w-full h-80 m-5 flex items-center justify-center">
                <h1 className="text-3xl font-bold text-center">Bienvenido a GESTION TECH</h1>
            </div>



            <hr />


            <div className="m-5">
                <h1 className='text-2xl my-5'>Mis Materiales</h1>
                <table className="w-full table-auto ">
                    <thead>
                        <tr>
                            <th className="p-2 border text-lg font-bold text-center">ID</th>
                            <th className="p-2 border text-lg font-bold text-center">Fecha Asignacion</th>

                            <th className="p-2 border text-lg font-bold text-center">
                                Material
                            </th>
                            <th className="p-2 border text-lg font-bold text-center">
                                Cantidad
                            </th>

                            <th className="p-2 border text-lg font-bold text-center">
                                Estado
                            </th>


                        </tr>
                    </thead>



                    <tbody>
                        {misMateriales.map((mat) => (
                            <tr key={mat.id_material}>
                                <td className='p-2 border text-center'>{mat.id_material}</td>
                                <td className='p-2 border  text-center'>{mat.fecha}</td>

                                <td className='p-2 border  text-center'>{mat.nombre_material}</td>
                                <td className='p-2 border  text-center'>{mat.cantidad}</td>

                                <td className='p-2 border  text-center'>{mat.estado_material}</td>




                            </tr>
                        ))}
                    </tbody>





                </table>
            </div>



        </div>
    );
}

export default Home;
