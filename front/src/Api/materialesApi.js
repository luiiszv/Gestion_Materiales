

import axios from "./axios";



export const getMateriales =()=> axios.get('/materiales');

export const registerMateriales= (data)=> axios.post('materiales/register', data)
