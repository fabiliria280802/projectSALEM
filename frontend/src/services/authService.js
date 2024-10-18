import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const login = async (email, password) => {
    try {
        const response = await axios.post(API_URL + 'login', { email, password });
        if (response.data.token) {
            // Guarda el token en localStorage
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    } catch (error) {
        console.error('Error en login:', error);
        throw new Error('Error al iniciar sesión');
    }
};

const logout = () => {
    localStorage.removeItem('token'); // Elimina el token de localStorage
};

export default {
    login,
    logout,
};