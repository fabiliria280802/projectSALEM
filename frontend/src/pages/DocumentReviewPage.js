import { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Toast } from 'primereact/toast';
import React from 'react';
import styles from '../styles/DocumentReviewPage.module.css';

const DocumentReviewPage = () => {
  const [fileType, setFileType] = useState("pdf");
//TODO: Cambiar el valor de la ruta del archivo para que sea dinamico en base al backend
  const [filePath, setFilePath] = useState("/factura01-test.pdf"); // Ruta del archivo

  return (
    <div className={styles.container}>
      {/* Columna Izquierda */}
      <div className={styles.leftColumn}>
        <h1 className={styles.title}>Resultado del análisis</h1>
        <p className={styles.info}>
          RUC: 1709551089001 (Grupo Imagineers S.A.)<br />
          Contrato: ME-EC3804<br />
          Archivo: factura2.pdf
        </p>

        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Parámetro</th>
              <th className={styles.tableHeader}>Cumple</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.tableCell}>RUC</td>
              <td className={styles.tableCell}>Sí</td>
            </tr>
            <tr>
              <td className={styles.tableCell}>Razón social</td>
              <td className={styles.tableCell}>Sí</td>
            </tr>
            <tr>
              <td className={styles.tableCell}>Logo</td>
              <td className={styles.tableCell}>Sí</td>
            </tr>
            <tr>
              <td className={styles.tableCell}>Lógica matemática</td>
              <td className={styles.tableCell}>Sí</td>
            </tr>
          </tbody>
        </table>

        <p className={styles.status}>
          Estado: <span className={styles.approved}>Aprobado</span>
        </p>

        <button className={styles.button}>Ir a revisión</button>
      </div>

      {/* Columna Derecha */}
      <div className={styles.rightColumn}>
        {fileType === 'pdf' ? (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div style={{ height: '100vh', width: '100%', overflow: 'auto' }}>
              <Viewer fileUrl={filePath} renderMode="canvas" />
            </div>
          </Worker>
        ) : (
          <img
            src={filePath}
            alt="Preview del documento"
            className={styles.preview}
          />
        )}
      </div>
    </div>
  );
};

export default DocumentReviewPage;


