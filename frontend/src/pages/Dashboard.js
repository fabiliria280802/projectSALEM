import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { Card } from "primereact";

const Dashboard = () => {
  return (
    <div className="p-container" style={{ padding: '2em' }}>
      <Card title="Dashboard">
        {/* Aquí puedes agregar estadísticas y gráficos del rendimiento de la IA */}
        <p>Estadísticas y gráficos del rendimiento de la IA</p>
      </Card>
    </div>
  );
};

export default Dashboard;

