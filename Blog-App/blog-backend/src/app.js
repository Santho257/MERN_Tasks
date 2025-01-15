import express from 'express';
import logger from './config/logger.config.js';
import morgan from "morgan";

const morganFormat = ":method :url :status :response-time ms";


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
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

export default app;