import { Sequelize } from 'sequelize-typescript';
import { User } from '../../domain/entities/User';
import { Transaction } from '../../domain/entities/Transaction';

export const sequelize = new Sequelize({
  database: 'vestidobank',
  dialect: 'mysql',
  username: 'root',      // seu usuário MySQL
  password: '',  // sua senha MySQL
  host: 'localhost',     // endereço do seu servidor MySQL
  models: [User, Transaction], // Adicione o modelo User aqui
});
