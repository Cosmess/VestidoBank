import { TransferService } from '../src/domain/services/TransferService';
import { UserRepository } from '../src/infrastructure/repositories/UserRepository';
import { TransactionRepository } from '../src/infrastructure/repositories/TransactionRepository';
import { User } from '../src/domain/entities/User';
import { Transaction } from '../src/domain/entities/Transaction';
import { Sequelize } from 'sequelize-typescript';

describe('TransferService', () => {
  let transferService: TransferService;
  let mockUserRepository: jest.Mocked<UserRepository>;
  let mockTransactionRepository: jest.Mocked<TransactionRepository>;
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      models: [User, Transaction],
    });
    await sequelize.sync();
  });

  beforeEach(() => {
    mockUserRepository = {
      findByCPF: jest.fn(),
      update: jest.fn(),
      create: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
    } as jest.Mocked<UserRepository>;

    mockTransactionRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAllTransactions: jest.fn(),
    } as jest.Mocked<TransactionRepository>;

    transferService = new TransferService(mockTransactionRepository, mockUserRepository);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should transfer money successfully', async () => {
    const sender = new User({ cpf: '123', balance: 100, type: 'user' });
    const receiver = new User({ cpf: '456', balance: 50, type: 'user' });

    mockUserRepository.findByCPF.mockImplementation(cpf => {
      if (cpf === '123') return Promise.resolve(sender);
      if (cpf === '456') return Promise.resolve(receiver);
      return Promise.resolve(null);
    });

    const transactionData = { senderCPF: '123', receiverCPF: '456', amount: 30 };

    const createdTransaction = new Transaction({ ...transactionData, status: 'pending' });
    jest.spyOn(createdTransaction, 'save').mockResolvedValue(createdTransaction);

    const result = await transferService.transferMoney(transactionData);

    expect(mockUserRepository.findByCPF).toHaveBeenCalledWith('123');
    expect(mockUserRepository.findByCPF).toHaveBeenCalledWith('456');
    expect(sender.balance).toBe(70); // 100 - 30
    expect(receiver.balance).toBe(80); // 50 + 30
  });

  it('should throw error if sender or receiver not found', async () => {
    mockUserRepository.findByCPF.mockResolvedValue(null);

    const transactionData = { senderCPF: '123', receiverCPF: '456', amount: 30 };

    await expect(transferService.transferMoney(transactionData)).rejects.toThrow('Sender or receiver not found');
  });

  it('should throw error if sender is not a user', async () => {
    const sender = new User({ cpf: '123', balance: 100, type: 'merchant' });
    const receiver = new User({ cpf: '456', balance: 50, type: 'user' });

    mockUserRepository.findByCPF.mockImplementation(cpf => {
      if (cpf === '123') return Promise.resolve(sender);
      if (cpf === '456') return Promise.resolve(receiver);
      return Promise.resolve(null);
    });

    const transactionData = { senderCPF: '123', receiverCPF: '456', amount: 30 };

    await expect(transferService.transferMoney(transactionData)).rejects.toThrow('Only users can send money');
  });

  it('should throw error if sender has insufficient balance', async () => {
    const sender = new User({ cpf: '123', balance: 20, type: 'user' });
    const receiver = new User({ cpf: '456', balance: 50, type: 'user' });

    mockUserRepository.findByCPF.mockImplementation(cpf => {
      if (cpf === '123') return Promise.resolve(sender);
      if (cpf === '456') return Promise.resolve(receiver);
      return Promise.resolve(null);
    });

    const transactionData = { senderCPF: '123', receiverCPF: '456', amount: 30 };

    await expect(transferService.transferMoney(transactionData)).rejects.toThrow('Insufficient balance');
  });
});
