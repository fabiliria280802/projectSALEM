import { Button } from 'primereact/button';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import styles from '../styles/LoginPage.module.css';
import authService from '../services/authService';

const LoginPage = () => {
    const { login, setIsAuthenticated } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            setIsAuthenticated(true);
            history.push('/');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Credenciales incorrectas');
        }
    };

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.loginPage}>
            <h1 className={styles.contentTitle}>Inicia Sesión</h1>
            <p className={styles.contentText}>
                Tu cuenta, tu espacio. <br /> Conéctate para continuar
            </p>
            <Button
				type="button"
                label="Continuar con Microsoft"
                icon="pi pi-microsoft"
                className={styles.microsoftButton}
            />
            <p className={styles.contentInfo}>
                Inicio de sesión con Microsoft 365 únicamente disponible para <br />{' '}
                colaboradores de ENAP.
            </p>
            <form onSubmit={handleSubmit}>
                <div className={styles.emailInput}>
                    <label>Correo electrónico</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={styles.passwordContainer}>
                    <label>Contraseña</label>
                    <div className={styles.passwordInput}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="button"
                            icon={showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'}
                            onClick={togglePasswordVisibility}
                            className={styles.eyeButton}
                        />
                    </div>
                </div>
                <Button type="submit" className={styles.buttons} label="Continuar" />
            </form>
        </div>
    );
};

export default LoginPage;

