import React, { useEffect } from 'react';
import { Button } from 'primereact/button';
import styles from '../styles/HomePage.module.css';
import homePage from '../assets/homePage.png';

const HomePage = () => {
    useEffect(() => {
        document.body.style.backgroundColor = '#F5F8FF';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <div className={styles.homePageContainer}>
            <div className={styles.outerSquare}>
                <div className={styles.homePageInfo}>
                    <h1 className={styles.homePageTitle}>TE ESPERAMOS</h1>
                    <p className={styles.homePageParagraph}>
                        <b>Automatización inteligente para la gestión de documentos</b>
                    </p>
                    <Button
                        label="Iniciar sesión"
                        className={styles.buttons}
                        onClick={() => window.location.href = '/login'}
                    />
                </div>
                <div className={styles.homePageImage}>
                    <img src={homePage} alt="Home Page" />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
