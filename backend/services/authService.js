const axios = require('axios');

const API_URL = 'http://localhost:5000/api/auth/';

const login = async (username, password) => {
    try {
        const response = await axios.post(API_URL + 'login', { username, password });
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        throw new Error('Error en el servicio de autenticación');
    }
};

const logout = () => {
    localStorage.removeItem('user');
};

module.exports = {
    login,
    logout,
};
