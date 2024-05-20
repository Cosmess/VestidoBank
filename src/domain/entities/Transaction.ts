import { Table, Column, Model, PrimaryKey, Default } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table
export class Transaction extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column
  id!: string;

  @Column
  senderCPF!: string;

  @Column
  receiverCPF!: string;

  @Column
  amount!: number;

  @Column
  status!: 'pending' | 'completed' | 'failed';
}
