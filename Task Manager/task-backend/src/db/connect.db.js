import { connect } from "mongoose";
import { MONGO_DB, MONGO_URL } from "../constants.js";
import logger from "../config/logger.config.js";

const connectDB = async () => {
    try {
        logger.info(`${MONGO_URL}/${MONGO_DB}`);
        const instance = await connect(`${MONGO_URL}/${MONGO_DB}`);
        logger.info(`Connected to MongoDB: ${instance.connection.host}`);
    } catch (error) {
        logger.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;