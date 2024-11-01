import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserUsecase } from '../../../../modules/user/use-cases/create-user-usecase/create-user.usecase';
import { DatabaseModule } from '../../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUserUsecase],
})
export class UserModule {}
