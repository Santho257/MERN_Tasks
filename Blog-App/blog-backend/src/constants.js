import { config } from "dotenv";
const path = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
config({path});

export const PORT = process.env.PORT;
export const MONGO_URL = process.env.MONGO_URL;
export const MONGO_DB = process.env.MONGO_DB;
export const VERSION = process.env.VERSION;
export const JWT_SECRET = process.env.JWT_SECRET;