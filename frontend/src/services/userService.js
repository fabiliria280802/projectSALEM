import axios from 'axios';
import authService from './authService';

const API_URL = 'http://localhost:8080/api/users/';

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
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    
    // Hacer la solicitud GET a la URL correcta con el userId
    const response = await axios.get(`${API_URL}${userId}`, config);
    
    // Devolver los datos del usuario
    return response.data;
  };  

  const deleteUser = async (userId) => {
    const token = authService.getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    
    const response = await axios.delete(`${API_URL}${userId}`, config);
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


