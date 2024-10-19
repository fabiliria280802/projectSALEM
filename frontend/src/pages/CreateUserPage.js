import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useHistory } from 'react-router-dom';
import userService from '../services/userService';  // Importar el servicio de usuario
import styles from '../styles/CreateUserPage.module.css';

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
            const response = await userService.createUser(userData);  // Enviar los datos al backend
            console.log('Usuario creado:', response);
            // Redireccionar después de crear el usuario (puedes ajustar la ruta)
            history.push('/user-management');
        } catch (error) {
            console.error('Error al crear el usuario:', error);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h1>Nuevo usuario</h1>
            <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Nombre:</label>
                    <InputText id="name" name="name" value={userData.name} onChange={handleInputChange} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="last_name">Apellido:</label>
                    <InputText id="last_name" name="last_name" value={userData.last_name} onChange={handleInputChange} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Correo:</label>
                    <InputText id="email" name="email" value={userData.email} onChange={handleInputChange} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="phone">Teléfono:</label>
                    <InputText id="phone" name="phone" value={userData.phone} onChange={handleInputChange} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="ruc">RUC:</label>
                    <InputText id="ruc" name="ruc" value={userData.ruc} onChange={handleInputChange} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="company_name">Empresa:</label>
                    <InputText id="company_name" name="company_name" value={userData.company_name} onChange={handleInputChange} />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="role">Permisos:</label>
                    <Dropdown id="role" value={userData.role} options={roleOptions} onChange={handleDropdownChange} placeholder="Seleccionar permiso" />
                </div>
            </div>

            <div className={styles.buttonGroup}>
                <Button label="Guardar" icon="pi pi-check" className="p-button-success" onClick={handleSubmit} />
                <Button label="Cancelar" icon="pi pi-times" className="p-button-secondary" />
            </div>
        </div>
    );
};

export default CreateUserPage;