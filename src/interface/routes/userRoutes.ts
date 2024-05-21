import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/UserController';
import { UserService } from '../../domain/services/UserService';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { TransactionRepository } from '../../infrastructure/repositories/TransactionRepository';;
import { TransactionController } from '../controllers/TransactionController';
import { TransactionService } from '../../domain/services/TransactionService';
import { TransactionMaintenanceController } from '../controllers/TransactionMaintenanceController';
import { TransactionMaintenanceService } from '../../domain/services/TransactionMaintenanceService';

export const userRoutes = async (fastify: FastifyInstance): Promise<void> => {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);
  const transactionRepository = new TransactionRepository();
  const transactionService = new TransactionService(transactionRepository);
  const transactionController = new TransactionController(transactionService);
  const transactionMaintenanceService = new TransactionMaintenanceService(transactionRepository, userRepository);
  const transactionMaintenanceController = new TransactionMaintenanceController(transactionMaintenanceService);

  fastify.post<{ Body: { fullName: string; cpf: string; email: string; password: string; type: 'user' | 'merchant' } }>('/users', (req, reply) => userController.createUser(req, reply));
  fastify.get<{ Params: { id: string } }>('/users/:id', (req, reply) => userController.getUser(req, reply));

  fastify.get('/transactions', (req, reply) => transactionController.getAllTransactions(req, reply));
  fastify.get<{ Params: { id: string } }>('/transactions/:id', (req, reply) => transactionController.getTransactionById(req, reply));

  fastify.post<{ Body: { transactionId: string; status: 'approved' | 'rejected' } }>('/transactions/maintenance', (req, reply) => transactionMaintenanceController.updateTransactionStatus(req, reply));
};
