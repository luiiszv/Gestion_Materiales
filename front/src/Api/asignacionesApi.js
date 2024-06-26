
import axios from "./axios";



export const getAllAsign = () => axios.get('/materiales/asignaciones');


export const asignarMateriales= (data)=> axios.post('/materiales/asignar', data);