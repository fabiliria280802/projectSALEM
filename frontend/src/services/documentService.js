import axios from 'axios';

const API_URL = 'http://localhost:5000/api/process-document/';

const addingDocuments = (file, documentType, text, metrics) => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('documentType', documentType);
	formData.append('text', text);
	formData.append('metrics', JSON.stringify(metrics));
	return axios.post(API_URL, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
};

const getDocumentById = (id, documentType) => {
	return axios.get(`${API_URL}${id}`, {
		params: { documentType },
	});
};

const updateDocument = (id, documentType, updatedData) => {
	return axios.put(`${API_URL}${id}`, { documentType, ...updatedData });
};

const getDocumentsList = documentType => {
	return axios.get(API_URL, {
		params: { documentType },
	});
};

const documentService = {
	addingDocuments,
	getDocumentById,
	updateDocument,
	getDocumentsList,
};

export default documentService;
