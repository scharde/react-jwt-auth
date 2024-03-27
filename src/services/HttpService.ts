import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3000/api';

const setJwt = (token: string): void => {
    // axios.defaults.headers.common["x-auth-token"] = jwt;
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt,
};