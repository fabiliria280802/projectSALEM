import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const login = async (email, password) => {
    try {
        const response = await axios.post(API_URL + 'login', { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        throw new Error('Error al iniciar sesión');
    }
};

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

const getToken = () => {
    return localStorage.getItem('token');
};

export default {
    login,
    logout,
    getToken,
};
