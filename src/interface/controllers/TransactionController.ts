import { FastifyRequest, FastifyReply } from 'fastify';
import { TransactionService } from '../../domain/services/TransactionService';

export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  async getAllTransactions(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const transactions = await this.transactionService.getAllTransactions();
      reply.status(200).send(transactions);
    } catch (error) {
        const err = error as Error;
      reply.status(500).send({ error: err.message });
    }
  }

  async getTransactionById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> {
    const { id } = req.params;

    try {
      const transaction = await this.transactionService.getTransactionById(id);
      if (transaction) {
        reply.status(200).send(transaction);
      } else {
        reply.status(404).send({ error: 'Transaction not found' });
      }
    } catch (error) {
        const err = error as Error;
      reply.status(500).send({ error: err.message });
    }
  }
}
