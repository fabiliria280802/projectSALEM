import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

// Manejar el login en el frontend
const login = async (email, password) => {
    try {
        const response = await axios.post(API_URL + 'login', { email, password });
        if (response.data.token) {
            // Almacenar token en localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user)); // Opcionalmente, guardar el usuario
        }
        return response.data;
    } catch (error) {
        throw new Error('Error al iniciar sesión');
    }
};

// Manejar el logout
const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Si guardaste los datos del usuario
};

// Obtener el token
const getToken = () => {
    return localStorage.getItem('token');
};

export default {
    login,
    logout,
    getToken,
};
