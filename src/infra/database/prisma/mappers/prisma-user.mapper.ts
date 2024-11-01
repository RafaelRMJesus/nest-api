import { User } from '../../../../modules/user/entities/user';
import { User as UserPrisma } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma({ id, email, name, password, createdAt }: User): UserPrisma {
    return {
      id,
      email,
      name,
      password,
      createdAt,
    };
  }

  static toDomain({ id, ...userData }: UserPrisma): User {
    return new User(
      {
        ...userData,
      },
      id,
    );
  }
}
