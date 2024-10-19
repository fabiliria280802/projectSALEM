import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const UsersManagementPage = () => {
    const history = useHistory();
	return (
		<div className="p-container" style={{ padding: '2em' }}>
			<Panel header="Gestión de usuarios">
				<p>Aquí puedes agregar la lógica para gestionar usuarios.</p>
                    <Button
                        label="Revisión"
                        onClick={() => history.push('/create-user')}
                    />
			</Panel>
		</div>
	);
};

export default UsersManagementPage;