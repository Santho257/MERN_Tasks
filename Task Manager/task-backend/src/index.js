import app from "./app.js";
import logger from "./config/logger.config.js";
import { PORT } from "./constants.js";
import connectDB from "./db/connect.db.js";

connectDB().then(() => {
    app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
        logger.info(`http://127.0.0.1:${PORT}`);
    }).on("error", (error) => {
        logger.error(`Error starting server: ${error.message}`);
    });
}).catch(error =>{
    logger.error(`Error connecting to database: ${error.message}`);
    process.exit(1);
})