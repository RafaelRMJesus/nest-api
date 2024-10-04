import { UserRepository } from './user-repository';
import { User } from '../entities/user';

export class UserRepositoryMock implements UserRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
