import documentService from '../services/documentService';

const UploadMIGO = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        await documentService.uploadMIGO(file);
        alert('MIGO subida exitosamente');
      } catch (error) {
        console.error('Error durante la subida del archivo:', error);
      }
    }
  };

  return (
    <Panel header="Subir MIGO">
      <div className="p-field">
        <FileUpload
          name="migo"
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

export default UploadMIGO;