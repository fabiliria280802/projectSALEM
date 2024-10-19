import React, { useState, useEffect } from 'react';
import Sidebar from '../Layout/Sidebar';
import { Button, Menubar } from 'primereact';
import authService from '../../services/authService';
import logo from '../../assets/logo.png';
import styles from '../../styles/Header.module.css';
import { useHistory } from 'react-router-dom';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
	const history = useHistory();

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


    const start = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ height: '40px' }}  />
            {isMobile && isLoggedIn && <Sidebar />}{' '}
            {/* Mostrar sidebar solo en pantallas pequeñas */}
        </div>
    );

    const menuItems = isLoggedIn
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

