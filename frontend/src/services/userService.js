import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:5000/api/users/';

const createUser = async (userData) => {
	const token = authService.getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.post(API_URL, userData, config);
    return response.data;
};

const getAllUsers = async () => {
	const token = authService.getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
	const response = await axios.get(API_URL, config);
	return response.data;
};

const getAUser = async (userId) => {
    const token = authService.getToken();

    if (!token) {
        throw new Error('Token no disponible');
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(`${API_URL}${userId}`, config);
    return response.data;
};

const deleteUser = async (userData, userId) => {
	const token = authService.getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
	const response = await axios.delete(`${API_URL}${userId}`, userData, config);
	return response.data;
};

const updateUser = async (userId, userData) => {
	const token = authService.getToken();
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
	const response = await axios.put(`${API_URL}${userId}`, userData, config);
	return response.data;
};

const userService = {
	createUser,
	getAllUsers,
	getAUser,
	deleteUser,
	updateUser,
};

export default userService;
