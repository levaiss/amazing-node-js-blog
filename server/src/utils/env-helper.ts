export const isProduction = process.env.APP_ENV === 'production';
export const APP_PORT = process.env.APP_PORT || 3000;
export const MONGO_DB_URI = process.env.APP_MONGODB_URI || '';
export const JWT_ACCESS_SECRET_KEY = process.env.APP_JWT_ACCESS_SECRET_KEY || 'secret';
export const MAILER_HOST = process.env.APP_MAILER_HOST || '';
export const MAILER_PORT = process.env.APP_MAILER_PORT || '';
export const MAILER_SECURE = process.env.APP_MAILER_SECURE === 'true';
export const MAILER_USER = process.env.APP_MAILER_USER || '';
export const MAILER_PASSWORD = process.env.APP_MAILER_PASSWORD || '';
