const express = require('express');
const bodyParser = require('body-parser');
//const helmet = require('helmet');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
/*const hesRoutes = require('./routes/');
const migoRoutes = require('./routes/');
const invoiceRoutes = require('./routes/');
const notificationRoutes = require('./routes/');
const iaMetricsRoutes = require('./routes/');
const reportRoutes = require('./routes/');
const validationRoutes = require('./routes/')*/
const createPasswordRoutes = require('./routes/create-password');
const authMiddleware = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API for');
});

//app.use(helmet());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/new-user', createPasswordRoutes);
/*app.use('/api/notification',notificationRoutes);
app.use('/api/report/report',reportRoutes);
app.use('/api/report/ia-metrics',iaMetricsRoutes);
app.use('/api/report/validation',validationRoutes);
app.use('/api/document/invoice',invoiceRoutes);
app.use('/api/document/hes',hesRoutes);
app.use('/api/document/migo',migoRoutes);*/

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});