import { connect } from "mongoose"
import { MONGO_DB, MONGO_URL } from "../constants.js"
import logger from "../config/logger.config.js";

const connectDb = async () => {
    try {
        const instance = await connect(`${MONGO_URL}/${MONGO_DB}`);
        if(instance){
            logger.info(`Connected to DB :: ${instance.connection.host}`);
        }
    } catch (error) {
        logger.error(`Error Connecting DB :: ${MONGO_URL}/${MONGO_DB}`)
        logger.error(error.message);
        process.exit(1);
    }
}

export {connectDb}