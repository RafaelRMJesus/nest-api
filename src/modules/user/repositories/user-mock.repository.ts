import { UserRepository } from './user.repository';
import { User } from '../entities/user';

export class UserMockRepository implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user: User) => user.email === email);

    if (!user) return null;
    return user;
  }
}
