import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UploadInvoices from './pages/UploadInvoices';
import UploadHES from './pages/UploadHES';
import UploadMIGO from './pages/UploadMIGO';
import UserManagement from './pages/UserManagement';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';
import { PrimeReactProvider } from 'primereact/api';

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<Header />
				<Sidebar />
				<PrimeReactProvider>
					<Switch>
						<Route path="/login" component={Login} />
						<Route path="/dashboard" component={Dashboard} />
						<Route path="/upload-invoices" component={UploadInvoices} />
						<Route path="/upload-hes" component={UploadHES} />
						<Route path="/upload-migo" component={UploadMIGO} />
						<Route path="/user-management" component={UserManagement} />
						<Route path="/" component={Login} />
					</Switch>
				</PrimeReactProvider>
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
