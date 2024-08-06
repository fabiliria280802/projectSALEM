import documentService from '../services/documentService';

const UploadInvoices = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        await documentService.uploadInvoice(file);
        alert('Factura subida exitosamente');
      } catch (error) {
        console.error('Error durante la subida del archivo:', error);
      }
    }
  };

  return (
    <Panel header="Subir Facturas">
      <div className="p-field">
        <FileUpload
          name="invoice"
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

export default UploadInvoices;

