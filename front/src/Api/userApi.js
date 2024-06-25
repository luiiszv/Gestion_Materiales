import axios from "./axios";

export const login = (user) => axios.post('/users/login', user);
