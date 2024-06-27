import axios from "./axios";

export const getMateriales = () => axios.get("/materiales");

export const registerMateriales = (data) =>
  axios.post("/materiales/register", data);

export const getMisMateriales = () => axios.get("/materiales/misMateriales");

export const getMaterial = (id_material) => axios.get(`/materiales/${id_material}`);

export const updateMaterial = (id_material, data)=> axios.put(`/materiales/editar/${id_material}`, data) ;
