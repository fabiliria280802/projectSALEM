import React from "react";
import styles from './LoginPage.module.css';

function LoginPage() {
  return (
    <main className={styles.loginPage}>
      <div className={styles.contentWrapper}>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/93e51145ee3700b3077bd6f3b3dee09e025616ff8d5e41a0e5ae0412c573c96b?placeholderIfAbsent=true&apiKey=524a616b403e4adc9b8bf16961c8c181" className={styles.logo} alt="Company logo" />
        <h1 className={styles.title}>Inicia sesión</h1>
        <p className={styles.subtitle}>Tu cuenta, tu espacio.</p>
        <p className={styles.description}>Conéctate para continuar.</p>
        <button className={styles.microsoftButton}>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e84956620c2b65c2006f0c0895b521868637756fd7dfb9eadc00183676267c92?placeholderIfAbsent=true&apiKey=524a616b403e4adc9b8bf16961c8c181" className={styles.microsoftIcon} alt="" />
          <span className={styles.microsoftButtonText}>Continuar con Microsoft</span>
        </button>
        <p className={styles.microsoftLoginInfo}>
          Inicio de sesión con Microsoft 365 únicamente disponible para colaboradores de ENAP
        </p>
        <div className={styles.divider} />
        <form>
          <label htmlFor="email" className={styles.inputLabel}>Correo electrónico</label>
          <input type="email" id="email" className={styles.inputField} aria-label="Correo electrónico" />
          <label htmlFor="password" className={styles.inputLabel}>Contraseña</label>
          <input type="password" id="password" className={styles.inputField} aria-label="Contraseña" />
          <button type="submit" className={styles.continueButton}>Continuar</button>
        </form>
      </div>
      <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c287c6df6212447c41b91d2b2ecd324aa7f5b267503461d2eedd4059b81f3bba?placeholderIfAbsent=true&apiKey=524a616b403e4adc9b8bf16961c8c181" className={styles.footerImage} alt="" />
    </main>
  );
}

export default LoginPage;