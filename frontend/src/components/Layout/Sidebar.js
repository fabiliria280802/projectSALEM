import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Drawer variant="permanent">
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/upload-invoices">
          <ListItemText primary="Subir Facturas" />
        </ListItem>
        <ListItem button component={Link} to="/upload-hes">
          <ListItemText primary="Subir HES" />
        </ListItem>
        <ListItem button component={Link} to="/upload-migo">
          <ListItemText primary="Subir MIGO" />
        </ListItem>
        <ListItem button component={Link} to="/user-management">
          <ListItemText primary="Gestión de Usuarios" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
