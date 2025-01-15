import app from "./app.js";
import logger from "./config/logger.config.js";
import { PORT } from "./constants.js";
import { connectDb } from "./db/connectDb.js";

connectDb()
    .then(() => {
        app.listen(PORT || 4000, () => {
            logger.info(`App listening to port ${PORT || 4000}`);
            logger.info(`http://localhost:${PORT || 4000}`)
        })
    })
    .catch((error) => {
        logger.error(error.message);
    })