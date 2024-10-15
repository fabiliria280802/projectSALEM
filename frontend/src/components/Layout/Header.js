import React, { useState, useEffect } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Sidebar from '../Layout/Sidebar';
import { Button, Menubar } from 'primereact';
import authService from '../../services/authService';
import logo from '../../assets/logo.png';
import styles from './Header.module.css'

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        authService.logout();
        setIsLoggedIn(false);
    };

    const start = (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ height: '40px' }} />
            {isLoggedIn && <Sidebar />}

        </div>
    );

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
            onClick={() => window.location.href = '/login'}
        />
    );

    return (
        <Menubar
            className={styles.header}
            start={start}
            end={end}
        />
    );
};

export default Header;
