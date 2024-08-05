import React, { useState } from 'react';
import { Button, Container, Typography, Input } from '@material-ui/core';
import documentService from '../services/documentService';

const UploadInvoices = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        await documentService.uploadInvoice(file);
        alert('Factura subida exitosamente');
      } catch (error) {
        console.error('Error during file upload:', error);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4">Subir Facturas</Typography>
      <Input type="file" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleUpload}>Subir</Button>
    </Container>
  );
};

export default UploadInvoices;
