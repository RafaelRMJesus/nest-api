import { User } from '../../../../../modules/user/entities/user';

export class UserViewModel {
  static toHttp({ id, name, createdAt, email }: User) {
    return {
      id,
      name,
      createdAt,
      email,
    };
  }
}
