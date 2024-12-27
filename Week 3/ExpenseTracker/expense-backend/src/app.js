import express from 'express';
import cors from 'cors';
import { allowedOrigins } from './constants.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(allowedOrigins));

export { app };