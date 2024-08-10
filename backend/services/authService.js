const axios = require('axios');

const API_URL = 'http://localhost:5000/api/auth/';

const login = (username, password) => {
	return axios
		.post(API_URL + 'login', { username, password })
		.then(response => {
			if (response.data.token) {
				localStorage.setItem('user', JSON.stringify(response.data));
			}
			return response.data;
		});
};

const logout = () => {
	localStorage.removeItem('user');
};

module.exports = {
	login,
	logout,
};
