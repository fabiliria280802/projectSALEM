import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import authService from '../services/authService';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import styles from '../styles/LoginPage.module.css';

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const history = useHistory();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			history.push('/');
		} else {
		}
	}, [history]);

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const response = await authService.login(email, password);
			if (response.token) {
				localStorage.setItem('token', response.token);
				history.push('/');
			} else {
				setError('Error en la autenticación');
			}
		} catch (err) {
			if (err.response && err.response.status === 401) {
				setError('Usuario o contraseña incorrectos');
			} else {
				setError('Ocurrió un error, por favor intenta de nuevo más tarde');
			}
		}
	};

	return (
		<main className={styles.loginPage}>
			<h1 className={styles.contentTitle}>Inicia Sesión</h1>
			<p className={styles.contentText}>
				Tu cuenta, tu espacio. <br /> Conéctate para comtinuar
			</p>
			<Button
				label="Continuar con Microsoft"
				icon="pi pi-microsoft"
				className={styles.microsoftButton}
			/>
			<p className={styles.contentInfo}>
				Inicio de seion con Micorsoft 365 unicamente disponible para <br />{' '}
				colaboradores de ENAP.
			</p>
			<form onSubmit={handleSubmit}>
				<div className={styles.contentFields}>
					<label htmlFor="email">Usuario</label>
					<InputText
						id="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</div>
				<div className={styles.contentFields}>
					<label htmlFor="password" className={styles.contentFieldsLabel}>
						Contraseña
					</label>
					<InputText
						id="password"
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				{error && <small className="p-error">{error}</small>}
				<Button label="Ingresar" type="submit" className={styles.buttons} />
			</form>
		</main>
	);
};

export default LoginPage;
