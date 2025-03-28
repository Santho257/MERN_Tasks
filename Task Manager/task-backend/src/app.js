import express from 'express';
import cors from 'cors';
import { ALLOWED_ORIGINS, BASE_URL } from './constants.js';
import errorHandler from './middlewares/errorhandle.middleware.js';
import AuthRouter from './routes/auth.route.js';
import morgan from 'morgan';
import logger from './config/logger.config.js';
import TaskListRouter from './routes/tasklist.route.js';
import { requireAuth } from './middlewares/requireauth.middleware.js';
import TaskRouter from './routes/task.route.js';

const morganFormat = ":method :url :status :response-time ms";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: ALLOWED_ORIGINS }));
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use(`${BASE_URL}/auth`, AuthRouter);
app.use(`${BASE_URL}/tasklists`, requireAuth, TaskListRouter);
app.use(`${BASE_URL}/tasks`, requireAuth, TaskRouter);

app.use(errorHandler);
export default app;