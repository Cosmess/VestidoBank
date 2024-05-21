import { FastifyInstance } from 'fastify';
import { TransferController } from '../controllers/TransferController';
import { TransferService } from '../../domain/services/TransferService';
import { TransactionRepository } from '../../infrastructure/repositories/TransactionRepository';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';

export const transferRoutes = async (fastify: FastifyInstance): Promise<void> => {
  const userRepository = new UserRepository();
  const transactionRepository = new TransactionRepository();
  const transferService = new TransferService(transactionRepository, userRepository);
  const transferController = new TransferController(transferService);

  fastify.post<{ Body: { senderCPF: string; receiverCPF: string; amount: number } }>('/transfer', (req, reply) => transferController.transferMoney(req, reply));
};
