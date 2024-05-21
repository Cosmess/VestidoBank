import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/UserController';
import { UserService } from '../../domain/services/UserService';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';

export const userRoutes = async (fastify: FastifyInstance): Promise<void> => {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  fastify.post<{ Body: { fullName: string; cpf: string; email: string; password: string; type: 'user' | 'merchant' } }>('/users', (req, reply) => userController.createUser(req, reply));
  fastify.get<{ Params: { id: string } }>('/users/:id', (req, reply) => userController.getUser(req, reply));
};
