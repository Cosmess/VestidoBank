import { Sequelize } from 'sequelize-typescript';
import { User } from '../../domain/entities/User';
import { Transaction } from '../../domain/entities/Transaction';

export const sequelize = new Sequelize({
  database: 'vestidobank',
  dialect: 'mysql',
  username: 'root',
  password: '', 
  host: 'localhost',
  models: [User, Transaction],
});
