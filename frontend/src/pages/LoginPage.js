import { Button } from 'primereact/button';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Hook para autenticación
import styles from '../styles/LoginPage.module.css'

const LoginPage = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            history.push('/');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Credenciales incorrectas');
        }
    };

    return (
        <div className={styles.loginPage}>
            <h1 className={styles.contentTitle}>Inicia Sesión</h1>
			<p className={styles.contentText}>
				Tu cuenta, tu espacio. <br /> Conéctate para comtinuar
			</p>
			<Button
				label="Continuar con Microsoft"
				icon="pi pi-microsoft"
				className={styles.microsoftButton}
			/>
			<p className={styles.contentInfo}>
				Inicio de seion con Micorsoft 365 unicamente disponible para <br />{' '}
				colaboradores de ENAP.
			</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Correo electronico</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Contraseña</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" className={styles.buttons} label="Continuar" />
            </form>
        </div>
    );
};

export default LoginPage;
