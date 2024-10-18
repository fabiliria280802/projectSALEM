import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import authService from '../services/authService';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
				console.log('Datos del token:', decodedUser);
                setUser(decodedUser);
            } catch (error) {
                console.error('Error decodificando el token:', error);
                authService.logout();
            }
        }
    }, []);

    const login = async (email, password) => {
        const userData = await authService.login(email, password);
        setUser(jwtDecode(userData.token));
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
