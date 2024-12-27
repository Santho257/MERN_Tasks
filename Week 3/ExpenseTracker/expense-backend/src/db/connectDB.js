import { connect } from 'mongoose'
import { connectionString, database } from '../constants.js'

const connectDB = async () => {
    try {
        const instance = await connect(`${connectionString}/${database}`)
        console.log(`Connected to Database on :: ${instance.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to database`);
        console.error(`${connectionString}/${database}`);
        process.exit(1);
    }
}

export {connectDB};