import React, { useState, useEffect } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Sidebar from '../Layout/Sidebar';
import { Button, Menubar } from 'primereact';
import authService from '../../services/authService';
import logo from '../../assets/logo.png';
import styles from '../../styles/Header.module.css';

const Header = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			setIsLoggedIn(true);
		}

		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const handleLogout = () => {
		authService.logout();
		setIsLoggedIn(false);
	};

	const start = (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<img src={logo} alt="Logo" style={{ height: '40px' }} />
			{isMobile && isLoggedIn && <Sidebar />}{' '}
			{/* Mostrar sidebar solo en pantallas pequeñas */}
		</div>
	);

	// Mostrar los menuItems solo si el usuario está logueado
	const menuItems = isLoggedIn
		? [
				{ label: 'Inicio', className: styles.menuItem },
				{ label: 'Estatus', className: styles.menuItem },
				{ label: 'Documentación', className: styles.menuItem },
				{ label: 'Entrenamiento', className: styles.menuItem },
				{ label: 'Permisos', className: styles.menuItem },
				{ label: 'Cuenta', className: styles.menuItem },
			]
		: []; // Si no está logueado, no mostrar ningún item

	const end = isLoggedIn ? (
		<Button
			label="Logout"
			icon="pi pi-sign-out"
			className="p-button-secondary"
			onClick={handleLogout}
		/>
	) : (
		<Button
			label="Iniciar sesión"
			className={styles.buttons}
			onClick={() => (window.location.href = '/login')}
		/>
	);

	return (
		<Menubar
			className={styles.header}
			model={!isMobile ? menuItems : []}
			start={start}
			end={end}
		/>
	);
};

export default Header;
