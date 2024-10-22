import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	useLocation,
} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CreateUserPage from './pages/CreateUserPage';
import DashboardPage from './pages/DashboardPage';
import UploadDocumentsPage from './pages/UploadDocumentsPage';
import UserAcountPage from './pages/UserAcountPage';
import UsersManagementPage from './pages/UsersManagementPage';
import EditUserPage from './pages/EditUserPage';
import PrivateRoute from './components/PrivateRoute';
import CreatePasswordPage from './pages/CreatePasswordPage';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import './App.css';

const AppContent = () => {
	const location = useLocation();

	return (
		<div className="App">
			<Header />
			<div className="content">
				<Switch>
					<Route path="/login" component={LoginPage} />

					{/* Rutas protegidas con los roles correspondientes */}
					<PrivateRoute
						path="/dashboard"
						component={DashboardPage}
						roles={['Administrador', 'Gestor']}
					/>
					<PrivateRoute
						path="/create-user"
						component={CreateUserPage}
						roles={['Administrador' ]}
					/>
					<PrivateRoute
						path="/upload-documents"
						component={UploadDocumentsPage}
						roles={['Administrador', 'Gestor', 'Cliente final']}
					/>
					<PrivateRoute
						path="/users-management"
						component={UsersManagementPage}
						roles={['Administrador']}
					/>
					<PrivateRoute
						path="/edit-user"
						component={EditUserPage}
						roles={['Administrador']}
					/>
					<PrivateRoute
						path="/user-account"
						component={UserAcountPage}
						roles={['Administrador']}
					/>

					{/* Rutas públicas */}
					<Route path="/create-password" component={CreatePasswordPage} />
					<Route path="/" component={HomePage} />
				</Switch>
			</div>
			<Footer currentPath={location.pathname} />
		</div>
	);
};

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<AppContent />
			</Router>
		</AuthProvider>
	);
};

export default App;