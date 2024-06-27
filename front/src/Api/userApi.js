import axios from "./axios";

export const login = (user) => axios.post("/users/login", user);

export const registerUsers = (user) => axios.post("/users/register", user);
export const getEstudiantes = () => axios.get("/users/estudiantes");

export const getUsers = () => axios.get("/users");

export const verify = () => axios.get("/users/verificar");

export const getOneUser = (id_usuario) => axios.get(`/users/${id_usuario}`);

export const editUser = (id_usuario, data) => axios.put(`/users/${id_usuario}`, data);
