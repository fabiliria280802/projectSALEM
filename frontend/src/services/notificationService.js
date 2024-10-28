//TODO: Delete this service
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/mail/';

const sendPasswordCreationEmail = async user => {
	try {
		const response = await axios.post(`${API_URL}send-password-email`, user);
		return response.data;
	} catch (error) {
		console.error('Error al enviar el correo de creación de contraseña:', error);
		throw error;
	}
};

const sendPasswordResetEmail = async user => {
	try {
		const response = await axios.post(`${API_URL}send-reset-password-email`, user);
		return response.data;
	} catch (error) {
		console.error('Error al enviar el correo de restablecimiento de contraseña:', error);
		throw error;
	}
};

const notificationService = {
	sendPasswordCreationEmail,
	sendPasswordResetEmail,
};

export default notificationService;
