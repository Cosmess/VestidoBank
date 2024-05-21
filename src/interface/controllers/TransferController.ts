import { FastifyRequest, FastifyReply } from 'fastify';
import { TransferService } from '../../domain/services/TransferService';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { TransactionRepository } from '../../infrastructure/repositories/TransactionRepository';

interface TransferRequest {
  senderCPF: string;
  receiverCPF: string;
  amount: number;
}

export class TransferController {
  constructor(private transferService: TransferService) {}

  async transferMoney(req: FastifyRequest<{ Body: TransferRequest }>, reply: FastifyReply): Promise<void> {
    const { senderCPF, receiverCPF, amount } = req.body;

    try {
      const transaction = await this.transferService.transferMoney({ senderCPF, receiverCPF, amount });
      reply.status(201).send(transaction);
    } catch (error) {
      const err = error as Error;
      reply.status(400).send({ error: err.message });
    }
  }
}
