import { Transaction } from '../../domain/entities/Transaction';

export class TransactionRepository {
  [x: string]: any;
  async create(transaction: Transaction): Promise<Transaction> {
    return transaction.save();
  }

  async findById(id: string): Promise<Transaction | null> {
    return Transaction.findByPk(id);
  }

  async findAllTransactions(): Promise<Transaction[]> {
    return await Transaction.findAll();
  }
}
