import axios from 'axios';

const API_URL = 'http://localhost:8080/api/documents/';

const uploadInvoice = file => {
	const formData = new FormData();
	formData.append('file', file);
	return axios.post(API_URL + 'invoices', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
};

const uploadHES = file => {
	const formData = new FormData();
	formData.append('file', file);
	return axios.post(API_URL + 'hes', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
};

const uploadMIGO = file => {
	const formData = new FormData();
	formData.append('file', file);
	return axios.post(API_URL + 'migos', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
};

const documentService = {
	uploadInvoice,
	uploadHES,
	uploadMIGO,
};

export default documentService;
