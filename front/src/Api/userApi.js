import axios from "./axios";

export const login = (user) => axios.post('/users/login', user);

export const verify = () => axios.get('/users/verificar')
