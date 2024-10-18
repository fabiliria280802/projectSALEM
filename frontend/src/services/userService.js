import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

const getAllUsers = async () => {
	const response = await axios.get(API_URL);
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
	getAllUsers,
	deleteUser,
	updateUser,
};

export default userService;
