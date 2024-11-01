import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../../user/repositories/user.repository';
import { compare } from 'bcrypt';
import { User } from 'src/modules/user/entities/user';
import { UserViewModel } from 'src/infra/http/modules/user/view-model/user-view.model';

interface ValidateUserRequest {
  email: string;
  password: string;
}

@Injectable()
export class ValidateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: ValidateUserRequest): Promise<Partial<User>> {
    const user: User | null = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordMatched = await compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return UserViewModel.toHttp(user);
  }
}
