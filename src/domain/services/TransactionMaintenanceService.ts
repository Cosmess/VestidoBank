import { Transaction } from '../entities/Transaction';
import { TransactionRepository } from '../../infrastructure/repositories/TransactionRepository';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';

interface TransactionUpdateRequest {
  transactionId: string;
  status: 'approved' | 'rejected';
}

export class TransactionMaintenanceService {
  constructor(private transactionRepository: TransactionRepository, private userRepository: UserRepository) {}

  async updateTransactionStatus(data: TransactionUpdateRequest): Promise<void> {
    const { transactionId, status } = data;

    const transaction = await this.transactionRepository.findById(transactionId);

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    if (status === 'approved') {

      await transaction.update({ status: 'approved' });
    } else if (status === 'rejected') {

      const sender = await this.userRepository.findByCPF(transaction.senderCPF);
      const receiver = await this.userRepository.findByCPF(transaction.receiverCPF);

      if (!sender || !receiver) {
        throw new Error('Sender or receiver not found');
      }

      await sender.update({ balance: sender.balance + transaction.amount });
      await receiver.update({ balance: receiver.balance - transaction.amount });

      await transaction.update({ status: 'rejected' });
    } else {
      throw new Error('Invalid status');
    }
  }
}
