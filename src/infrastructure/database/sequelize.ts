import { Sequelize } from 'sequelize-typescript';
import { User } from '../../domain/entities/User';
import { Transaction } from '../../domain/entities/Transaction';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
  database: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT as 'mysql' | undefined,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  models: [User, Transaction],
});
