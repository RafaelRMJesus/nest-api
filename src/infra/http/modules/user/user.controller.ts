import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserUsecase } from '../../../../modules/user/use-cases/create-user-usecase/create-user.usecase';
import { CreateUserBody } from './dtos/create-user.body';
import { UserViewModel } from './view-model/user-view.model';

@Controller('users')
export class UserController {
  constructor(private createUserUsecase: CreateUserUsecase) {}

  @Post()
  async createPost(@Body() body: CreateUserBody) {
    const { email, name, password } = body;
    const user = await this.createUserUsecase.execute({
      email,
      name,
      password,
    });
    return UserViewModel.toHttp(user);
  }
}
