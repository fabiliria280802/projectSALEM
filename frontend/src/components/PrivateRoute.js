import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    const { user } = useAuth(); // Usa el contexto de autenticación para obtener el usuario

    return (
        <Route
            {...rest}
            render={props => {
                // Si no hay usuario autenticado, redirige al login
                if (!user) {
                    return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
                }

                // Si el rol del usuario no está en los roles permitidos, redirige
                if (roles && roles.indexOf(user.role) === -1) {
                    return <Redirect to="/unauthorized" />;
                }

                // Si el usuario está autenticado y tiene acceso, renderiza el componente
                return <Component {...props} />;
            }}
        />
    );
};

export default PrivateRoute;
