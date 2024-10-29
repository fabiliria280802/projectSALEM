import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/EditUserPage.module.css';

const ResetPasswordPage = () => {
	const history = useHistory();
	const toast = useRef(null);
	const [encryptedCode, setEncryptedCode] = useState('');
	const [userEmail, setUserEmail] = useState('');

	// Actualización del estado del código de verificación
	const handleCodeChange = e => {
		setEncryptedCode(e.target.value);
	};

	// Actualización del estado del email
	const handleEmailChange = e => {
		setUserEmail(e.target.value);
	};

	// Lógica para enviar el código de verificación al backend
	const handleSubmit = async () => {
		// Verificar si ambos valores están presentes
		if (!userEmail || !encryptedCode) {
			toast.current.show({
				severity: 'warn',
				summary: 'Advertencia',
				detail: 'Por favor, completa todos los campos',
				life: 3000,
			});
			return;
		}

		try {
			console.log('Email:', userEmail); // Verificar el email ingresado
			console.log('Code:', encryptedCode); // Verificar el código ingresado

			const response = await axios.post(
				'http://localhost:5000/api/users-mail/verify-reset-code',
				{
					email: userEmail,
					code: encryptedCode,
				},
			);

			if (response.data.message === 'Código verificado correctamente') {
				const userId = response.data.userId;
				toast.current.show({
					severity: 'success',
					summary: 'Éxito',
					detail: 'Código verificado correctamente',
					life: 3000,
				});
				setTimeout(
					() => history.push(`/create-password?userId=${userId}`),
					1500,
				);
			}
		} catch (error) {
			toast.current.show({
				severity: 'error',
				summary: 'Error',
				detail: error.message,
				life: 3000,
			});
		}
	};

	return (
		<div className={styles.container}>
			<Toast ref={toast} />
			<div className={styles.formContainer}>
				<h1 className={styles.formTitle}>Reseteo de Contraseña</h1>
				<div className={styles.formGroup}>
					<label htmlFor="userEmail">Correo Electrónico:</label>
					<InputText
						id="userEmail"
						value={userEmail}
						onChange={handleEmailChange}
						placeholder="Ingresa tu correo"
					/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="encryptedCode">Código de Verificación:</label>
					<InputText
						id="encryptedCode"
						value={encryptedCode}
						onChange={handleCodeChange}
						placeholder="Pega aquí el código de verificación"
					/>
				</div>
				<div className={styles.buttonContainer}>
					<Button
						label="Verificar"
						className={styles.saveButton}
						onClick={handleSubmit}
					/>
					<Button
						label="Cancelar"
						className={styles.cancelButton}
						onClick={() => history.goBack()}
					/>
				</div>
			</div>
		</div>
	);
};

export default ResetPasswordPage;
