import { connect } from 'mongoose'
import { connectionString, database } from '../constants'
const connectDB = async () => {
    connect(`${connectionString}/${database}`)
        .then((instance) => {
            console.log(`Connected to Database on :: ${instance.connection.host}`);
        })
        .catch((err) => {
            console.error(`Error connecting to database`);
            console.error(`${connectionString}/${database}`);
        });
}