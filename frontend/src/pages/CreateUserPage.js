import React, { useState } from 'react';
import styles from '../styles/EditUserPage.module.css';

const CreateUserPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    ruc: '',
    telefono: '',
    empresa: '',
    permisos: 'Usuario'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    console.log('Nuevo usuario creado:', formData);
    // Aquí puedes agregar la lógica para enviar los datos al backend
  };

  const handleCancel = () => {
    console.log('Operación cancelada');
    // Lógica para cancelar la creación
  };

  return (
    <div className={styles.editUserPage}>
      <header className={styles.header}>
        <img src="/logo.png" alt="ENAP Logo" className={styles.logo} />
        <span className={styles.pageTitle}>Crear usuario</span>
        <img src="/franja.png" alt="Franja Header" className={styles.headerFranja} />
      </header>

      <div className={styles.container}>
        <div className={styles.formContainer}>
          <h1 className={styles.formTitle}>Crear usuario</h1>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Ingresa el nombre"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Apellido:</label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange}
                placeholder="Ingresa el apellido"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Correo:</label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleInputChange}
                placeholder="Ingresa el correo"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Teléfono:</label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                placeholder="Ingresa el teléfono"
              />
            </div>

            <div className={styles.formGroup}>
              <label>RUC:</label>
              <input
                type="text"
                name="ruc"
                value={formData.ruc}
                onChange={handleInputChange}
                placeholder="Ingresa el RUC"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Empresa:</label>
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleInputChange}
                placeholder="Ingresa la empresa"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Permisos:</label>
              <select
                name="permisos"
                value={formData.permisos}
                onChange={handleInputChange}
              >
                <option value="Usuario">Usuario</option>
                <option value="Administrador">Administrador</option>
                <option value="Gestor">Gestor</option>
              </select>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button onClick={handleSave} className={styles.saveButton}>
              Guardar
            </button>
            <button onClick={handleCancel} className={styles.cancelButton}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserPage;