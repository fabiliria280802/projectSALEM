import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import React, { useState } from 'react';
import styles from '../styles/EditUserPage.module.css';
import userService from '../services/userService';
import { useHistory } from 'react-router-dom';

const CreateUserPage = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    name: '',
    last_name: '',
    phone: '',
    company_name: '',
    ruc: '',
    email: '',
    role: ''
  });
  const [showPopup, setShowPopup] = useState(false); // Estado para mostrar el pop-up

  const roleOptions = [
    { label: 'Usuario final', value: 'Usuario final' },
    { label: 'Gestor', value: 'Gestor' },
    { label: 'Administrador', value: 'Administrador' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleDropdownChange = (e) => {
    setUserData({ ...userData, role: e.value });
  };

  const handleSubmit = async () => {
    try {
      await userService.createUser(userData);
      setShowPopup(true); // Muestra el pop-up tras la creación del usuario
    } catch (error) {
      console.error('Error al crear el usuario:', error);
      if (error.response) {
          console.error('Error al crear el usuario:', error.response.data.message);
          console.error('Estado del error:', error.response.status);
      } else {
          console.error('Error al crear el usuario:', error.message);
      }
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    history.push('/users-management'); // Redirige a la página de gestión de usuarios
  };

  const handleCancel = () => {
    history.push('/users-management');
  };

  return (
    <div className={styles.editUserPage}>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1 className={styles.formTitle}>Crear usuario</h1>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Nombre:</label>
              <InputText
                id="name"
                name="name"
                value={userData.name}
                onChange={handleInputChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="last_name">Apellido:</label>
              <InputText
                id="last_name"
                name="last_name"
                value={userData.last_name}
                onChange={handleInputChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Correo:</label>
              <InputText
                id="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Teléfono:</label>
              <InputText
                id="phone"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="ruc">RUC:</label>
              <InputText
                id="ruc"
                name="ruc"
                value={userData.ruc}
                onChange={handleInputChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="company_name">Empresa:</label>
              <InputText
                id="company_name"
                name="company_name"
                value={userData.company_name}
                onChange={handleInputChange} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="role">Permisos:</label>
              <Dropdown
                id="role"
                value={userData.role}
                options={roleOptions}
                onChange={handleDropdownChange}
                placeholder="Seleccionar permiso" />
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Button label="Guardar" className={styles.saveButton} onClick={handleSubmit}/>
            <Button label="Cancelar" className={styles.cancelButton} onClick={handleCancel}/>
          </div>

          {showPopup && (
            <div className={styles.popup}>
              <div className={styles.popupContent}>
                <h2>Usuario creado</h2>
                <p>El usuario ha sido creado correctamente y se ha enviado un correo para crear la contraseña.</p>
                <Button label="Aceptar" onClick={handlePopupClose} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateUserPage;