import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../../domain/services/UserService';

interface CreateUserRequest {
  fullName: string;
  cpf: string;
  email: string;
  password: string;
  type: 'user' | 'merchant';
}

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(req: FastifyRequest<{ Body: CreateUserRequest }>, reply: FastifyReply): Promise<void> {
    const { fullName, cpf, email, password, type } = req.body;

    try {
      const user = await this.userService.createUser({ fullName, cpf, email, password, type });
      reply.status(201).send(user);
    } catch (error) {
      const err = error as Error;
      reply.status(400).send({ error: err.message });
    }
  }

  async getUser(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> {
    const { id } = req.params;

    try {
      const user = await this.userService.getUserById(id);
      if (user) {
        reply.status(200).send(user);
      } else {
        reply.status(404).send({ error: 'User not found' });
      }
    } catch (error) {
      const err = error as Error;
      reply.status(400).send({ error: err.message });
    }
  }
}
