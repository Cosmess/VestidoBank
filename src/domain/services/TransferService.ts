import { Transaction } from '../entities/Transaction';
import { TransactionRepository } from '../../infrastructure/repositories/TransactionRepository';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';

interface TransferRequest {
  senderCPF: string;
  receiverCPF: string;
  amount: number;
}

export class TransferService {
  constructor(private transactionRepository: TransactionRepository, private userRepository: UserRepository) {}

  async transferMoney(data: TransferRequest): Promise<Transaction> {
    const { senderCPF, receiverCPF, amount } = data;

    const sender = await this.userRepository.findByCPF(senderCPF);
    const receiver = await this.userRepository.findByCPF(receiverCPF);

    if (!sender || !receiver) {
      throw new Error('Sender or receiver not found');
    }

     if (sender.type !== 'user') {
        throw new Error('Only users can send money');
      }

    if (sender.balance < amount) {
      throw new Error('Insufficient balance');
    }

    const transaction = new Transaction({ senderCPF, receiverCPF, amount, status: 'pending' });
    await transaction.save();

    await sender.update({ balance: sender.balance - amount });
    await receiver.update({ balance: receiver.balance + amount });

    return transaction;
  }
}
