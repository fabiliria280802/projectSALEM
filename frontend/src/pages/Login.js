import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@material-ui/core';
import authService from '../services/authService';

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
    <Container>
      <Typography variant="h4">Iniciar Sesión</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Usuario" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField label="Contraseña" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="contained" color="primary" type="submit">Ingresar</Button>
      </form>
    </Container>
  );
};

export default Login;

