import React, { useState } from 'react';
import { Button, Container, Typography, Input } from '@material-ui/core';
import documentService from '../services/documentService';

const UploadHES = () => {
	const [file, setFile] = useState(null);

	const handleFileChange = e => {
		setFile(e.target.files[0]);
	};

	const handleUpload = async () => {
		if (file) {
			try {
				await documentService.uploadHES(file);
				alert('HES subida exitosamente');
			} catch (error) {
				console.error('Error during file upload:', error);
			}
		}
	};

	return (
		<Container>
			<Typography variant="h4">Subir HES</Typography>
			<Input type="file" onChange={handleFileChange} />
			<Button variant="contained" color="primary" onClick={handleUpload}>
				Subir
			</Button>
		</Container>
	);
};

export default UploadHES;
