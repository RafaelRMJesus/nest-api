import { User } from 'src/modules/user/entities/user'

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
}
