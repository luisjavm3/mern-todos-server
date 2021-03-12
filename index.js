import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import dbConnection from './config/dbConnection.js';

import authRoutes from './routes/authRoutes.js';

dotenv.config();
colors.enable();
const app = express();

dbConnection();

app.use(express.json());
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}`.bgGreen.black);
});
