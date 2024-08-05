import React from 'react';
import { Typography, Container } from '@material-ui/core';

const Footer = () => {
  return (
    <Container style={{ textAlign: 'center', padding: '1em 0' }}>
      <Typography variant="body2" color="textSecondary">
        &copy; 2024 ENAP Ecuador. Todos los derechos reservados.
      </Typography>
    </Container>
  );
};

export default Footer;
