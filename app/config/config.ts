import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: '.env' });

export const CONF_ENV: string = process.env.CONF_ENV || 'local';
export const PORT: string | number = process.env.PORT || 3000;
export const ROOT = path.normalize(__dirname + '/..'); // Root path of server
export const LOG_LEVEL: string = process.env.LOG_LEVEL || 'debug';
export const MONGO_DEBUG: string = process.env.MONGO_DEBUG;

export const MONGO_APP_URL = process.env.ATLAST_DB_URL;  // ATLAST Url

export const ACCU_WEATHER_URL = process.env.ACCU_WEATHER_URL;  // Accuweather Backend URL
export const ACCU_WEATHER_API_KEY = process.env.ACCU_WEATHER_API_KEY;  // Accuweather API Key

