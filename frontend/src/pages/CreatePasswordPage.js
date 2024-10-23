import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import styles from '../styles/CreatePasswordPage.module.css';

const CreatePasswordPage = () => {
  const location = useLocation();
  const history = useHistory();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const query = new URLSearchParams(location.search);
  const userId = query.get('userId');

  const toggleNewPasswordVisibility = (e) => {
    e.preventDefault();
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = (e) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

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
        history.push('/login');
      }, 3000);
    } catch (error) {
      if (error.response) {
        setError(`Error: ${error.response.data.message || 'Error desconocido'}`);
        console.error('Detalles del error:', error.response.data);
      } else {
        setError('Error en la conexión con el servidor');
        console.error('Error:', error);
      }
    }
  };

  const handleCancel = () => {
    history.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Crea tu contraseña</h1>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="newPassword">Nueva Contraseña:</label>
            <InputText
              id="newPassword"
              name="newPassword"
              value={newPassword}
              type={showNewPassword ? 'text' : 'password'}
              onChange={(e) => setNewPassword(e.target.value)} />
            <Button
              type="button"
              icon={showNewPassword ? 'pi pi-eye-slash' : 'pi pi-eye'}
              onClick={toggleNewPasswordVisibility}
              className={styles.eyeButton} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
            <InputText
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              type={showConfirmPassword ? 'text' : 'password'}
              onChange={(e) => setConfirmPassword(e.target.value)} />
            <Button
              type="button"
              icon={showConfirmPassword ? 'pi pi-eye-slash' : 'pi pi-eye'}
              onClick={toggleConfirmPasswordVisibility}
              className={styles.eyeButton} />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button label="Guardar" className={styles.saveButton} onClick={handleSubmit} />
          <Button label="Cancelar" className={styles.cancelButton} onClick={handleCancel} />
        </div>
      </div>
    </div>
    /*<div>
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
        <Button label="Guardar" className={styles.saveButton} onClick={handleSubmit}/>
        <Button label="Cancelar" className={styles.cancelButton} onClick={handleCancel}/>
      </form>
    </div>*/
  );
};

export default CreatePasswordPage;