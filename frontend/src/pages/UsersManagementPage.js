import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../styles/UsersManagementPage.module.css';
import userService from '../services/userService';

const UsersManagementPage = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Usar useEffect para cargar los usuarios al montar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getAllUsers();
        console.log(data); // Verificar la estructura de los datos
        setUsers(data); // Actualiza el estado con los datos desde el backend
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };

    fetchUsers();
  }, []); // Ejecuta una sola vez al montar el componente

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowPopup(true);
  };

  const confirmDelete = async () => {
    try {
      await userService.deleteUser(userToDelete._id); // Cambiar a _id
      setUsers(users.filter(user => user._id !== userToDelete._id)); // Cambiar a _id
      setShowPopup(false);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const cancelDelete = () => {
    setShowPopup(false);
  };

  // Redirigir a la página de edición de usuario, pasando el user._id en la URL
  const handleEditClick = (user) => {
    history.push(`/edit-user/${user._id}`); // Cambiar a _id
  };

  const handleCreateClick = () => {
    history.push('/create-user');
  };

  const handleReturnClick = () => {
    history.push('/main-menu');
  };

  return (
    <div className={styles.usersManagementPage}>
      <div className={styles.container}>
        <h1 className={styles.formTitle}>Gestión de usuarios</h1>

        <div className={styles.buttonContainer}>
          <button className={styles.newButton} onClick={handleCreateClick}>Crear usuario</button>
          <button className={styles.exitButton} onClick={handleReturnClick}>Volver al menú principal</button>
        </div>

        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>RUC</th>
              <th>Empresa</th>
              <th>Permisos</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.ruc}</td>
                <td>{user.company_name}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEditClick(user)} // Redirigir con _id
                  >
                    Editar
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteClick(user)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showPopup && (
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              <h2>Confirmar eliminación</h2>
              <p>¿Estás seguro de que deseas eliminar a {userToDelete?.name} {userToDelete?.last_name}?</p>
              <div className={styles.popupActions}>
                <button onClick={confirmDelete} className={styles.confirmButton}>Eliminar</button>
                <button onClick={cancelDelete} className={styles.cancelButton}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersManagementPage;
