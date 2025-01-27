import express from 'express';
import cors from 'cors';
import { ALLOWED_ORIGINS } from './constants.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({origin: ALLOWED_ORIGINS}));

export default app;