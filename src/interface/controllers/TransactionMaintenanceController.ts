import { FastifyRequest, FastifyReply } from 'fastify';
import { TransactionMaintenanceService } from '../../domain/services/TransactionMaintenanceService';

interface TransactionUpdateRequest {
  transactionId: string;
  status: 'approved' | 'rejected';
}

export class TransactionMaintenanceController {
  constructor(private transactionMaintenanceService: TransactionMaintenanceService) {}

  async updateTransactionStatus(req: FastifyRequest<{ Body: TransactionUpdateRequest }>, reply: FastifyReply): Promise<void> {
    const { transactionId, status } = req.body;

    try {
      await this.transactionMaintenanceService.updateTransactionStatus({ transactionId, status });
      reply.status(200).send({ message: 'Transaction status updated successfully' });
    } catch (error) {
        const err = error as Error;
      reply.status(500).send({ error: err.message });
    }
  }
}
