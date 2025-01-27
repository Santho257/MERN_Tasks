import express from 'express';
import cors from 'cors';
import { ALLOWED_ORIGINS, BASE_URL } from './constants.js';
import errorHandler from './middlewares/errorhandle.middleware.js';
import AuthRouter from './routes/auth.route.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({origin: ALLOWED_ORIGINS}));

app.use(`${BASE_URL}/auth`, AuthRouter);

app.use(errorHandler);
export default app;