import 'primeicons/primeicons.css';

import { Panel } from 'primereact';

const Footer = () => {
	return (
		<Panel
			className="custom-footer"
			style={{ textAlign: 'center', padding: '1em 0' }}
		>
			<p style={{ margin: 0, color: 'var(--text-secondary-color)' }}>
				&copy; 2024 - ENAP Ecuador.
			</p>
			<img src='' alt='lindlekin'/>
		</Panel>
	);
};

export default Footer;
