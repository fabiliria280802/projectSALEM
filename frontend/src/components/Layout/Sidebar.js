import React, { useState } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { Sidebar as PrimeSidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { PanelMenu } from 'primereact/panelmenu';

const Sidebar = () => {
	const [visible, setVisible] = useState(false);

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
		<div>
			<Button
				icon="pi pi-bars"
				onClick={() => setVisible(true)}
				className="p-mr-2"
			/>
			<PrimeSidebar visible={visible} onHide={() => setVisible(false)}>
				<PanelMenu model={items} style={{ width: '100%' }} />
			</PrimeSidebar>
		</div>
	);
};

export default Sidebar;
