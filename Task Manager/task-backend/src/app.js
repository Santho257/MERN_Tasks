import express from 'express';
import cors from 'cors';
import { ALLOWED_ORIGINS } from './constants.js';
import errorHandler from './middlewares/errorhandle.middleware.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({origin: ALLOWED_ORIGINS}));

app.use(errorHandler);
export default app;