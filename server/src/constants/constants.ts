import * as dotenv from 'dotenv';
dotenv.config();

export const Constants = {
  APP_NAME: 'kovaja-web',
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PWD: process.env.DB_PWD
};
