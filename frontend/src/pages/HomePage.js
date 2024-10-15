import React from 'react';
import { Button } from 'primereact/button';
import styles from './HomePage.module.css';
import homePage from '../assets/homePage.png';

const HomePage = () => {
    return (
        <div className={styles.homePage}>
            <div className={styles.outerSquare}>
                <div className={styles.homePageInfo}>
                    <h1 className={styles.homePageTittle}>TE ESPERAMOS</h1>
                    <p className={styles.homePageParagraph}>Automatización inteligente para la gestión de documentos</p>
                    <Button
                        label="Iniciar sesión"
                        className={styles.buttons}
                        onClick={() => window.location.href = '/login'}/>
                </div>
                <div className={styles.homePageImage}>
                    <img src={homePage} alt="Home Page" style={{ height: '100%' }}/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;