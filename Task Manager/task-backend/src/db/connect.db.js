const { connect } = require("mongoose");
const { MONGO_URL, MONGO_DB } = require("../constants.js");
const { default: logger } = require("../config/logger.config.js");

const connectDB = async () => {
    try {
        const instance = await connect(`${MONGO_URL}/${MONGO_DB}`);
        logger.info(`Connected to MongoDB: ${instance.connection.host}`);
    } catch (error) {
        logger.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;