import dotenv from 'dotenv';

dotenv.config();

export const config = {
    SERVER_HOST: process.env.SERVER_HOST || 5000,
    FRONTEND_HOST: process.env.FRONTEND_HOST,
};
