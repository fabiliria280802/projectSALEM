import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
	const user = JSON.parse(localStorage.getItem('user'));

	return (
		<Route
			{...rest}
			render={props => {
				if (!user) {
					return (
						<Redirect
							to={{ pathname: '/login', state: { from: props.location } }}
						/>
					);
				}

				if (roles && roles.indexOf(user.role) === -1) {
					return <Redirect to="/login" />;
				}

				return <Component {...props} />;
			}}
		/>
	);
};

export default PrivateRoute;
