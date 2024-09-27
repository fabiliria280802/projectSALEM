import React, { useState, useEffect } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Sidebar from '../Layout/Sidebar';
import { Button, Menubar } from 'primereact';
import authService from '../../services/authService';

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
            {isLoggedIn && <Sidebar />}
            <h1 style={{ margin: 0, color: 'white', paddingLeft: 10 }}>
                Welcome to SALEM
            </h1>
        </div>
    );

    const end = isLoggedIn ? (
        <Button
            label="Logout"
            icon="pi pi-sign-out"
            className="p-button-secondary"
            onClick={handleLogout}
        />
    ) : null;

    return (
        <Menubar
            start={start}
            end={end}
            style={{ backgroundColor: '#1976d2', border: 'none' }}
        />
    );
};

export default Header;
