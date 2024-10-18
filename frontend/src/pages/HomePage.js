import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom'; // Usamos useHistory para redirigir
import styles from '../styles/HomePage.module.css';
import homePage from '../assets/homePage.png';

const HomePage = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const history = useHistory(); // Hook para redirigir a otras páginas

	useEffect(() => {
		// Verifica si hay un token válido en localStorage
		const token = localStorage.getItem('token'); // Ejemplo simple de autenticación
		if (token) {
			setIsAuthenticated(true); // Usuario autenticado
		} else {
			setIsAuthenticated(false); // Usuario no autenticado
		}

		// Cambia el color de fondo
		document.body.style.backgroundColor = '#F5F8FF';
		return () => {
			document.body.style.backgroundColor = '';
		};
	}, []);
	if (isAuthenticated === null) {
		return <div>Loading...</div>; // Mientras verificamos, mostramos un indicador de carga
	}
	return (
		<div className={styles.homePageContainer}>
			<div className={styles.outerSquare}>
				{isAuthenticated ? (
					// Visualización si el usuario está autenticado
					<div className={styles.homePageInfo}>
						<h1 className={styles.homePageTitle}>¡Bienvenido de nuevo!</h1>
						<p className={styles.homePageParagraph}>
							<b>Accede a tus documentos y gestiona tus tareas fácilmente.</b>
						</p>
						<Button
							label="Ir al dashboard"
							className={styles.buttons}
							onClick={() => history.push('/dashboard')}
						/>
					</div>
				) : (
					// Visualización si el usuario no está autenticado
					<div className={styles.homePageContainer}>
						<div className={styles.outerSquare}>
							<div className={styles.homePageInfo}>
								<h1 className={styles.homePageTitle}>TE ESPERAMOS</h1>
								<p className={styles.homePageParagraph}>
									<b>
										Automatización inteligente para la gestión de documentos
									</b>
								</p>
								<Button
									label="Iniciar sesión"
									className={styles.buttons}
									onClick={() => history.push('/login')}
								/>
							</div>
							<div className={styles.homePageImage}>
								<img src={homePage} alt="Home Page" />
							</div>
						</div>
					</div>
				)}
				<div className={styles.homePageImage}>
					<img src={homePage} alt="Home Page" />
				</div>
			</div>
		</div>
	);
};

export default HomePage;
