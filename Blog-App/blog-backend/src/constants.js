import { config } from "dotenv";
const path = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
config({path});

export const PORT = process.env.PORT;
export const MONGO_URL = process.env.MONGO_URL;
export const MONGO_DB = process.env.MONGO_DB;
export const BASE_URL = `/api/v${process.env.API_VERSION}`;
export const JWT_SECRET = process.env.JWT_SECRET;
export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;