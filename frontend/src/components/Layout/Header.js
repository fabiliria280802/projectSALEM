import React, { useEffect, useState } from 'react';
import { Button, Menubar } from 'primereact';
import logo from '../../assets/logo.png';
import styles from '../../styles/Header.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Header = () => {
	const { isAuthenticated, logout, user } = useAuth(); // user.role contiene el rol actual
	const [isMobile, setIsMobile] = useState(false);
	const history = useHistory();
	const location = useLocation();

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768);
		};

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const handleLogout = () => {
		logout();
		history.push('/login');
	};

	const handleMenuItemClick = path => {
		history.push(path);
	};

	const pageTitles = {
		'/dashboard': 'Dashboard',
		'/create-user': 'Crear Usuario',
		'/upload-documents': 'Carga de Documentos',
		'/users-management': 'Gestión de Usuarios',
		'/user-account': 'Cuenta de Usuario',
		'/edit-user': 'Editar usuario',
	};

	const pageTitle = pageTitles[location.pathname] || 'Nombre de la pestaña';

	const start = (
		<div style={{ display: 'flex', alignItems: 'center' }}>
			<img
				src={logo}
				alt="Logo"
				style={{ height: '40px' }}
				onClick={() => history.push('/')}
			/>
		</div>
	);

	// Opciones de menú por rol
	const menuOptionsByRole = {
		Administrador: [
			{ label: 'Inicio', command: () => handleMenuItemClick('/') },
			{ label: 'Estatus', command: () => handleMenuItemClick('/status') },
			{
				label: 'Documentación',
				command: () => handleMenuItemClick('/documentation'),
			},
			{
				label: 'Entrenamiento',
				command: () => handleMenuItemClick('/training'),
			},
			{ label: 'Permisos', command: () => handleMenuItemClick('/permissions') },
			{
				label: 'Gestión de usuarios',
				command: () => handleMenuItemClick('/users-management'),
			},
			{ label: 'Cuenta', command: () => handleMenuItemClick('/user-account') },
		],
		Proveedor: [
			{ label: 'Inicio', command: () => handleMenuItemClick('/') },
			{ label: 'Estatus', command: () => handleMenuItemClick('/status') },
			{
				label: 'Documentación',
				command: () => handleMenuItemClick('/documentation'),
			},
			{ label: 'Cuenta', command: () => handleMenuItemClick('/user-account') },
		],
		Gestor: [
			{ label: 'Inicio', command: () => handleMenuItemClick('/') },
			{ label: 'Estatus', command: () => handleMenuItemClick('/status') },
			{
				label: 'Documentación',
				command: () => handleMenuItemClick('/documentation'),
			},
			{
				label: 'Entrenamiento',
				command: () => handleMenuItemClick('/training'),
			},
			{ label: 'Cuenta', command: () => handleMenuItemClick('/user-account') },
		],
	};

	const menuItems =
		isAuthenticated && user ? menuOptionsByRole[user.role] || [] : [];

	const renderEndButton = () => {
		if (isAuthenticated) {
			return (
				<Button
					label="Logout"
					icon="pi pi-sign-out"
					className="p-button-secondary"
					onClick={handleLogout}
				/>
			);
		} else {
			return (
				<Button
					label="Iniciar sesión"
					className={styles.buttons}
					onClick={() => history.push('/login')}
				/>
			);
		}
	};

	const headerClass = styles.headerShadow;

	return (
		<Menubar
			className={`${styles.header} ${headerClass}`}
			model={!isMobile ? menuItems : []}
			start={start}
			end={renderEndButton()}
		/>
	);
};

export default Header;
