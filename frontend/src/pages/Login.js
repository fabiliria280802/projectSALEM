import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { authService } from '../services/authService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.login(username, password);
      history.push('/dashboard');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen">
      <Card title="Iniciar Sesión" className="p-fluid">
        <form onSubmit={handleSubmit}>
          <div className="p-field">
            <label htmlFor="username">Usuario</label>
            <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="p-field">
            <label htmlFor="password">Contraseña</label>
            <InputText id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button label="Ingresar" icon="pi pi-check" type="submit" className="p-mt-2" />
        </form>
      </Card>
    </div>
  );
};

export default Login;

