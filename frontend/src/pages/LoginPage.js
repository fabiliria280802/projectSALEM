import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth'; // Hook para autenticación

const LoginPage = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password); // Realiza el login
            history.push('/'); // Redirige al dashboard
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Credenciales incorrectas');
        }
    };

    return (
        <div>
            <h1>Iniciar sesión</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Contraseña</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default LoginPage;
