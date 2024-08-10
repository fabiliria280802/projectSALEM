import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { Button, Menubar } from 'primereact';

const Header = () => {
	const start = <h1 style={{ margin: 0, color: 'white' }}>Welcome to SALEM</h1>;
	const end = (
		<Button
			label="Logout"
			icon="pi pi-sign-out"
			className="p-button-secondary"
		/>
	);

	return (
		<Menubar
			start={start}
			end={end}
			style={{ backgroundColor: '#1976d2', border: 'none' }}
		/>
	);
};

export default Header;
