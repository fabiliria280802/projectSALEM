import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import styles from '../styles/UsersManagementPage.module.css';

const UsersManagementPage = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      nombre: 'Ana',
      apellido: 'Pérez',
      correo: 'ana.perez@solucionesperez.com',
      telefono: '998765432',
      ruc: '1701234567001',
      empresa: 'Soluciones Pérez',
      permisos: 'Usuario',
    },
    {
      id: 2,
      nombre: 'Carlos',
      apellido: 'López',
      correo: 'carlos.lopez@logisticalopez.com',
      telefono: '992345678',
      ruc: '1709876543001',
      empresa: 'Logística López',
      permisos: 'Usuario',
    },
    {
      id: 3,
      nombre: 'María',
      apellido: 'Sánchez',
      correo: 'msanchez@enap.com.ec',
      telefono: '997654321',
      ruc: '-',
      empresa: 'ENAP Ecuador',
      permisos: 'Gestor',
    },
    {
      id: 4,
      nombre: 'José',
      apellido: 'Ramírez',
      correo: 'jramirez@enap.com.ec',
      telefono: '995432167',
      ruc: '-',
      empresa: 'ENAP Ecuador',
      permisos: 'Administrador',
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const navigate = useNavigate(); // Usamos el hook para navegar entre rutas

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowPopup(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter(user => user !== userToDelete));
    setShowPopup(false);
  };

  const cancelDelete = () => {
    setShowPopup(false);
  };

  const handleEditClick = (user) => {
    // Redirige a la pantalla de editar con el ID del usuario
    navigate(`/edit-user/${user.id}`, { state: { user } });
  };

  const handleCreateClick = () => {
    // Redirige a la pantalla de crear usuario
    navigate('/create-user');
  };

  return (
    <div className={styles.usersManagementPage}>
      <header className={styles.header}>
        <img src="/logo.png" alt="ENAP Logo" className={styles.logo} />
        <span className={styles.pageTitle}>Gestión de usuarios</span>
        <img src="/franja.png" alt="Franja Header" className={styles.headerFranja} />
      </header>

      <div className={styles.container}>
        <h1 className={styles.formTitle}>Gestión de usuarios</h1>

        <div className={styles.buttonContainer}>
          <button className={styles.newButton} onClick={handleCreateClick}>Crear usuario</button>
          <button className={styles.exitButton}>Volver al menú principal</button>
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
                <td>{user.nombre}</td>
                <td>{user.apellido}</td>
                <td>{user.correo}</td>
                <td>{user.telefono}</td>
                <td>{user.ruc}</td>
                <td>{user.empresa}</td>
                <td>{user.permisos}</td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEditClick(user)}
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
              <p>¿Estás seguro de que deseas eliminar a {userToDelete?.nombre} {userToDelete?.apellido}?</p>
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
