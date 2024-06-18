import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import walletRoutes from './routes/walletRoutes';
import checkBlacklistRoute from './routes/checkBlacklistRoute';
import morgan from 'morgan';
import expressWinston from 'express-winston';
import logger from './utils/logger';
import errorHandler from './middlewares/errorHandler';
import authMiddleware from './middlewares/authMiddleware';
import winston from 'winston';
import './db/knex'; // Initialize knex and bind it to the models
import dotenv from 'dotenv';
dotenv.config();


const { combine, timestamp, json } = winston.format;


const app = express();

app.use(bodyParser.json());
// app.use(userRoutes);
// app.use(walletRoutes);

app.use(morgan('dev'));

// Middleware to log all HTTP requests with winston
app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({
        filename: 'combined.log',
    }),
    new winston.transports.File({
        filename: 'app-error.log',
        level: 'error',
    }),
  ],
  format: combine(timestamp(), json()),
}));

app.use(express.json());

app.use(authMiddleware); // Ensure this is applied before your routes
app.use('/api', userRoutes);
app.use('/api', checkBlacklistRoute);
app.use('/api', walletRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
