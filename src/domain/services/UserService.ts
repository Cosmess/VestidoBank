import { User } from '../entities/User';
import { UserRepository } from '../../infrastructure/repositories/UserRepository';
import { v4 as uuidv4 } from 'uuid';

interface CreateUserDTO {
  fullName: string;
  cpf: string;
  email: string;
  password: string;
  type: 'user' | 'merchant';
}

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(data: CreateUserDTO): Promise<User> {
    const userExists = await this.userRepository.findByCPF(data.cpf) || await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw new Error('User with this CPF or email already exists');
    }

    const user = new User({ id: uuidv4(), ...data, balance: 200 });
    return this.userRepository.create(user);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
