import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { Panel } from 'primereact';

const Footer = () => {
	return (
		<Panel
			className="custom-footer"
			style={{ textAlign: 'center', padding: '1em 0' }}
		>
			<p style={{ margin: 0, color: 'var(--text-secondary-color)' }}>
				&copy; 2024 ENAP Ecuador. Todos los derechos reservados.
			</p>
		</Panel>
	);
};

export default Footer;
