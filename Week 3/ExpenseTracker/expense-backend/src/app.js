import express from 'express';
import cors from 'cors';
import { allowedOrigins, BASE_URL } from './constants.js';
import AuthRouter from './routes/auth.route.js';
import ExpListRouter from './routes/explist.route.js';
import { requireAuth } from './middlewares/requireAuth.middleware.js';
import UserRoute from './routes/user.route.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(allowedOrigins));

app.use(`${BASE_URL}/auth`, AuthRouter);
app.use(`${BASE_URL}/explists`, requireAuth, ExpListRouter);
app.use(`${BASE_URL}/users`, requireAuth, UserRoute);


export { app };