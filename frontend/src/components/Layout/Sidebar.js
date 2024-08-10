import 'primereact/resources/themes/saga-blue/theme.css'; // Importa el tema que prefieras
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { PanelMenu } from 'primereact';

const Sidebar = () => {
	const items = [
		{
			label: 'Dashboard',
			icon: 'pi pi-fw pi-home',
			command: () => {
				window.location.href = '/dashboard';
			},
		},
		{
			label: 'Subir Facturas',
			icon: 'pi pi-fw pi-upload',
			command: () => {
				window.location.href = '/upload-invoices';
			},
		},
		{
			label: 'Subir HES',
			icon: 'pi pi-fw pi-upload',
			command: () => {
				window.location.href = '/upload-hes';
			},
		},
		{
			label: 'Subir MIGO',
			icon: 'pi pi-fw pi-upload',
			command: () => {
				window.location.href = '/upload-migo';
			},
		},
		{
			label: 'Gestión de Usuarios',
			icon: 'pi pi-fw pi-users',
			command: () => {
				window.location.href = '/user-management';
			},
		},
	];

	return (
		<div className="p-sidebar p-component" style={{ width: '250px' }}>
			<PanelMenu model={items} style={{ width: '100%' }} />
		</div>
	);
};

export default Sidebar;
