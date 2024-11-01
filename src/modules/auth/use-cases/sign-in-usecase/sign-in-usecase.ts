import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/entities/user';
import { UserPayload } from '../../models/user.payload';
import { JwtService } from '@nestjs/jwt';

interface SignInRequest {
  user: User;
}

@Injectable()
export class SignInUsecase {
  constructor(private jwtService: JwtService) {}

  async execute({ user }: SignInRequest) {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      created_at: user.createdAt.toJSON(),
    };

    return this.jwtService.sign(payload);
  }
}
