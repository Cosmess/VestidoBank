import { TransactionRepository } from '../../infrastructure/repositories/TransactionRepository';
import { Transaction } from '../entities/Transaction';

export class TransactionService {
  constructor(private transactionRepository: TransactionRepository) {}

  async getAllTransactions(): Promise<Transaction[]> {
    return this.transactionRepository.findAllTransactions();
  }

  async getTransactionById(transactionId: string): Promise<Transaction | null> {
    return this.transactionRepository.findById(transactionId);
  }
}
