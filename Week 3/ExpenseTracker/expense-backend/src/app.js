import express from 'express';
import cors from 'cors';
import { allowedOrigins, BASE_URL } from './constants.js';
import AuthRouter from './routes/auth.route.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(allowedOrigins));

app.use(`${BASE_URL}/auth`, AuthRouter)

export { app };