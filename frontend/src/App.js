import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import UploadInvoices from './pages/UploadInvoices';
import UploadHES from './pages/UploadHES';
import UploadMIGO from './pages/UploadMIGO';
import UserManagement from './pages/UserManagement';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Header />
				<Switch>
					<Route path="/login" component={LoginPage} />
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/upload-invoices" component={UploadInvoices} />
					<Route path="/upload-hes" component={UploadHES} />
					<Route path="/upload-migo" component={UploadMIGO} />
					<Route path="/user-management" component={UserManagement} />
					<Route path="/" component={HomePage} />
				</Switch>
				<Footer />
			</Router>
		</AuthProvider>
	);
};

export default App;

/*TODO: Original code

import logo from './logo.svg';
import './App.css';

function App() {
  return (
	<div className="App">
	  <header className="App-header">
		<img src={logo} className="App-logo" alt="logo" />
		<p>
		  Edit <code>src/App.js</code> and save to reload.
		</p>
		<a
		  className="App-link"
		  href="https://reactjs.org"
		  target="_blank"
		  rel="noopener noreferrer"
		>
		  Learn React
		</a>
	  </header>
	</div>
  );
}

export default App;*/
