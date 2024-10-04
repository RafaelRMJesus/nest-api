import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user-repository';
import { User } from '../../entities/user';
import { hash } from 'bcrypt';

interface CreatedUserRequest {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUsecase {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email, password }: CreatedUserRequest) {
    const user = new User({
      name,
      email,
      password: await hash(password, 10),
    });

    await this.userRepository.create(user);

    return user;
  }
}
