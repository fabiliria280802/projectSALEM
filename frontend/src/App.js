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
import DashboardPage from './pages/DashboardPage';
import UploadDocumentsPage from './pages/UploadDocumentsPage';
import UserManagementPage from './pages/UserManagementPage';
import PrivateRoute from './components/PrivateRoute';
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
						path="/upload-documents"
						component={UploadDocumentsPage}
						roles={['Administrador', 'Gestor', 'Cliente final']}
					/>
					<PrivateRoute
						path="/user-management"
						component={UserManagementPage}
						roles={['Administrador']}
					/>

					{/* Rutas públicas */}
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
