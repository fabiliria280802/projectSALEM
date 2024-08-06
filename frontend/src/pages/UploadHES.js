import documentService from '../services/documentService';
import React, { useState } from 'react';
import { Panel } from 'primereact/panel';
import { FileUpload } from 'primereact';
import { Button } from 'primereact/button';

const UploadHES = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        await documentService.uploadHES(file);
        alert('HES subida exitosamente');
      } catch (error) {
        console.error('Error durante la subida del archivo:', error);
      }
    }
  };

  return (
    <Panel header="Subir HES">
      <div className="p-field">
        <FileUpload
          name="hes"
          customUpload
          uploadHandler={handleFileChange}
          auto={false}
          mode="basic"
          chooseLabel="Seleccionar archivo"
        />
      </div>
      <Button label="Subir" icon="pi pi-upload" className="p-button-primary" onClick={handleUpload} />
    </Panel>
  );
};

export default UploadHES;

