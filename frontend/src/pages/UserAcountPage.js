import React, { useEffect, useState } from 'react';
import userService from '../services/userService';
import authService from '../services/authService';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import styles from '../styles/EditUserPage.module.css';
import { useHistory } from 'react-router-dom';

const UserAccountPage = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    name: '',
    last_name: '',
    email: '',
    phone: '',
    ruc: '',
    company_name: '',
    role: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Opciones para el Dropdown de permisos
  const roleOptions = [
    { label: 'Usuario final', value: 'Usuario final' },
    { label: 'Gestor', value: 'Gestor' },
    { label: 'Administrador', value: 'Administrador' }
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = authService.getToken();
        if (!token) throw new Error('Token no disponible');
        const decodedToken = authService.decodeToken(token);
        const userId = decodedToken.id;
        const userData = await userService.getAUser(userId);
        setUserData(userData); // Llena el estado con los datos del usuario
      } catch (err) {
        setError('Error al cargar los datos del usuario');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleDropdownChange = (e) => {
    setUserData({ ...userData, role: e.value });
  };

  const handleCancel = () => {
    history.goBack();
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>Mi cuenta</h1>
        <p>Empresa: {userData.company_name}</p>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nombre:</label>
            <InputText
              id="name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              disabled />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="last_name">Apellido:</label>
            <InputText
              id="last_name"
              name="last_name"
              value={userData.last_name}
              onChange={handleInputChange}
              disabled />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Correo:</label>
            <InputText
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              disabled />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Teléfono:</label>
            <InputText
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              disabled />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="ruc">RUC:</label>
            <InputText
              id="ruc"
              name="ruc"
              value={userData.ruc}
              onChange={handleInputChange}
              disabled />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="role">Permisos:</label>
            <Dropdown
                id="role"
                value={userData.role}
                options={roleOptions}
                onChange={handleDropdownChange}
                placeholder="Seleccionar permiso"
                disabled/>
          </div>
        </div>
        <p> * Si deseas actualizar la información de tu perfil, comunícate con el <a href="mailto:mateo.avila@udla.edu.ec">administrador</a>.</p>
        <Button
          label="Regresar"
          className={styles.goBackButton}
          onClick={handleCancel}/>
      </div>
    </div>
  );
};

export default UserAccountPage;
