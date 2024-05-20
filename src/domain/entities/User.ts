import { Table, Column, Model, PrimaryKey, IsEmail, Unique, Default } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table
export class User extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column
  id!: string;

  @Column
  fullName!: string;

  @Unique
  @Column
  cpf!: string;

  @IsEmail
  @Unique
  @Column
  email!: string;

  @Column
  password!: string;

  @Column
  balance!: number;

  @Column
  type!: 'user' | 'merchant';
}
