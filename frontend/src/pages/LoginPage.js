import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import authService from '../services/authService';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import styles from './LoginPage.module.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();  // Para redirigir después del login

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.login(username, password);
            localStorage.setItem('token', response.token);
            history.push('/dashboard');
        } catch (err) {
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
        <main className={styles.loginPage}>
            <div className={styles.contentWrapper}>
                <img loading="lazy" src="" className={styles.logo} alt="Company logo"/>
                <Card title="Iniciar Sesión" className="p-fluid">
                    <form onSubmit={handleSubmit}>
                        <div className="p-field">
                            <label htmlFor="username">Usuario</label>
                            <InputText
                                id="username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="p-field">
                            <label htmlFor="password">Contraseña</label>
                            <InputText
                                id="password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <small className="p-error">{error}</small>}
                        <Button
                            label="Ingresar"
                            icon="pi pi-check"
                            type="submit"
                            className="p-mt-2"
                        />
                        </form>
                </Card>
            </div>
        </main>
    );
};

export default LoginPage;