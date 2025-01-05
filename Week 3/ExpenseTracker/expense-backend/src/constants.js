import { config } from "dotenv";
const envPath = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
console.log(envPath)
config({path:envPath});

export const connectionString = process.env.MONGO_URL;
export const database = process.env.MONGO_DATABASE;

export const allowedOrigins = process.env.ALLOWED_ORIGINS;

export const port = process.env.PORT;

export const jwtSecret = process.env.JWT_SECRET
export const BASE_URL = `/api/v${process.env.VERSION}`