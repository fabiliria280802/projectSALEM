import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import authService from '../services/authService';
import {jwtDecode} from 'jwt-decode'; // Asegúrate de importar jwt-decode correctamente

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para verificar si el usuario está autenticado

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                console.log('Datos del token:', decodedUser);
                setUser(decodedUser);
                setIsAuthenticated(true); // Si hay un token válido, el usuario está autenticado
            } catch (error) {
                console.error('Error decodificando el token:', error);
                authService.logout();
                setIsAuthenticated(false); // Si el token es inválido, desautenticamos al usuario
            }
        }
    }, []);

    const login = async (email, password) => {
        const userData = await authService.login(email, password);
        setUser(jwtDecode(userData.token)); // Guardamos los datos decodificados del usuario
        setIsAuthenticated(true); // Indicamos que el usuario está autenticado
        localStorage.setItem('token', userData.token); // Guardamos el token en el localStorage para persistencia
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false); // Cuando cerramos sesión, indicamos que no está autenticado
        localStorage.removeItem('token'); // Limpiamos el token del localStorage
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
