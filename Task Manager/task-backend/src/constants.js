import {config} from 'dotenv';
config({path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`});

export const BASE_URL = `/api/${process.env.API_VERSION}`;
export const MONGO_URL = process.env.MONGO_URL;
export const MONGO_DB = process.env.MONGO_DB;
export const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;