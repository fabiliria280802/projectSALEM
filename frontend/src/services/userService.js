import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users/';

const createUser = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.post(API_URL, userData, config);
    return response.data;
};

const getAllUsers = async () => {
	const response = await axios.get(API_URL);
	return response.data;
};

const getAUser = async userId => {
	const response = await axios.get(`${API_URL}${userId}`);
	return response.data;
};

const deleteUser = async userId => {
	const response = await axios.delete(`${API_URL}${userId}`);
	return response.data;
};

const updateUser = async (userId, userData) => {
	const response = await axios.put(`${API_URL}${userId}`, userData);
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
