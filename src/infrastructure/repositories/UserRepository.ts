import { User } from '../../domain/entities/User';

export class UserRepository {
  async create(user: User): Promise<User> {
    return user.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }

  async findByCPF(cpf: string): Promise<User | null> {
    return User.findOne({ where: { cpf } });
  }

  async findById(id: string): Promise<User | null> {
    return User.findByPk(id);
  }
}
