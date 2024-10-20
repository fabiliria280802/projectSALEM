import React, { useEffect, useState } from 'react';
import Sidebar from '../Layout/Sidebar';
import { Button, Menubar } from 'primereact';
import logo from '../../assets/logo.png';
import styles from '../../styles/Header.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'; // Importamos useAuth para usar el estado de autenticación global

const Header = () => {
    const { isAuthenticated, logout } = useAuth(); // Usamos isAuthenticated para saber si el usuario está logueado, y logout para cerrar sesión
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
        logout(); // Usamos la función logout del contexto
        history.push('/login'); // Redirigimos al usuario a la página de login después de cerrar sesión
    };

    const handleMenuItemClick = (path) => {
        history.push(path);
    };

    // Definir las rutas en las que no quieres mostrar los menuItems
    const hideMenuItemsIn = ['/upload-documents', '/create-user', '/users-management', '/user-account', '/dashboard'];
    const shouldShowMenuItems = !hideMenuItemsIn.includes(location.pathname);

    // Definir un objeto de mapeo de rutas a nombres de pestañas
    const pageTitles = {
        '/dashboard': 'Dashboard',
        '/create-user': 'Crear Usuario',
        '/upload-documents': 'Carga de Documentos',
        '/users-management': 'Gestión de Usuarios',
        '/user-account': 'Cuenta de Usuario',
        '/another-path': 'Otra Página',
    };

    // Obtener el nombre de la pestaña actual basado en la ruta
    const pageTitle = pageTitles[location.pathname] || 'Nombre de la pestaña';

    const start = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
                src={logo}
                alt="Logo"
                style={{ height: '40px' }}
                onClick={() => history.push('/')} // Usamos history.push para navegar a la página principal
            />
            {isMobile && isAuthenticated && <Sidebar />}
            {/* Mostrar sidebar solo en pantallas pequeñas */}
        </div>
    );

    const menuItems = isAuthenticated && shouldShowMenuItems
        ? [
              { label: 'Inicio', className: styles.menuItem, command: () => handleMenuItemClick('/') },
              { label: 'Estatus', className: styles.menuItem },
              { label: 'Documentación', className: styles.menuItem },
              { label: 'Entrenamiento', className: styles.menuItem },
              { label: 'Permisos', className: styles.menuItem },
              { label: 'Gestión de usuarios', className: styles.menuItem, command: () => handleMenuItemClick('/users-management') },
              { label: 'Cuenta', className: styles.menuItem, command: () => handleMenuItemClick('/user-account') },
          ]
        : [];

    const renderEndButton = () => {
        if (isAuthenticated) {
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
                    onClick={() => history.push('/login')}
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
