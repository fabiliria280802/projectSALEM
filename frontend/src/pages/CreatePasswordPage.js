import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const CreatePasswordPage = () => {
  const location = useLocation();
  const history = useHistory();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Obtener el userId desde la URL
  const query = new URLSearchParams(location.search);
  const userId = query.get('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/new-user/create-password/${userId}`, {
        password: newPassword,
      });

      setSuccessMessage('Contraseña creada exitosamente');
      setTimeout(() => {
        history.push('/login');  // Redirigir a la página de login después de crear la contraseña
      }, 3000);
    } catch (error) {
      // Capturar detalles del error y mostrarlos
      if (error.response) {
        setError(`Error: ${error.response.data.message || 'Error desconocido'}`);
        console.error('Detalles del error:', error.response.data);
      } else {
        setError('Error en la conexión con el servidor');
        console.error('Error:', error);
      }
    }
  };

  return (
    <div>
      <h1>Crea tu nueva contraseña</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="newPassword">Nueva Contraseña:</label>
          <InputText
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <InputText
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <Button label="Crear Contraseña" type="submit" />
      </form>
    </div>
  );
};

export default CreatePasswordPage;