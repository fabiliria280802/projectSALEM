import React, { useState, useEffect } from 'react';
import Sidebar from '../Layout/Sidebar';
import { Button, Menubar } from 'primereact';
import authService from '../../services/authService';
import logo from '../../assets/logo.png';
import styles from '../../styles/Header.module.css';
import { useHistory, useLocation } from 'react-router-dom';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
	const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
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
        window.location.href = '/';
    };

	const handleMenuItemClick = (path) => {
        history.push(path);
    };
    //TODO: Agregar cada lista de dominios de pestaña que novan a visualizar el menuITem
    const hideMenuItemsIn = ['/upload-documents', '/create-user','/users-management', '/user-account','/dashboard'];
    const shouldShowMenuItems = !hideMenuItemsIn.includes(location.pathname);

    const pageTitles = {
        '/dashboard': 'Dashboard',
        '/create-user': 'Crear Usuario',
        '/upload-documents': 'Carga de Documentos',
        '/users-management': 'Gestión de Usuarios',
        '/user-account': 'Cuenta de Usuario',
        '/another-path': 'Otra Página',
    };

    const pageTitle = pageTitles[location.pathname] || 'Nombre de la pestaña';

    const start = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
                src={logo}
                alt="Logo"
                style={{ height: '40px' }}
                onClick={() => (window.location.href = '/')} />
            {isMobile && isLoggedIn && <Sidebar />}{' '}
            {/* Mostrar sidebar solo en pantallas pequeñas */}
        </div>
    );

    const menuItems = isLoggedIn && shouldShowMenuItems
        ? [
              { label: 'Inicio', className: styles.menuItem, command: () => handleMenuItemClick('/') },
              { label: 'Estatus', className: styles.menuItem },
              { label: 'Documentación', className: styles.menuItem },
              { label: 'Entrenamiento', className: styles.menuItem },
              { label: 'Permisos', className: styles.menuItem },
			  { label: 'Gestion de usuarios', className: styles.menuItem, command: () => handleMenuItemClick('/users-management') },
              { label: 'Cuenta', className: styles.menuItem, command: () => handleMenuItemClick('/user-account') },
          ]
        : [];

const renderEndButton = () => {
    if (isLoggedIn) {
        if (shouldShowMenuItems) {
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
                <div className={styles.pageContainerTitle}>
                    <span className={styles.pageTitle}>{pageTitle}</span>
                </div>
            );
        }
    } else {
        return (
            <Button
                label="Iniciar sesión"
                className={styles.buttons}
                onClick={() => (window.location.href = '/login')}
            />
        );
    }
};

const headerClass = shouldShowMenuItems ? styles.headerShadow : styles.headerWithImage;

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