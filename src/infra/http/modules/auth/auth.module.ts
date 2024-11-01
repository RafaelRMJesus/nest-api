import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { ValidateUserUseCase } from '../../../../modules/auth/use-cases/validate-user-usecase/validate-user-usecase';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from '../../../database/database.module';
import { SignInDTOValidateMiddleware } from './middleware/sing-in-dto-validate.middleware';
import { SignInUsecase } from '../../../../modules/auth/use-cases/sign-in-usecase/sign-in-usecase';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../../../modules/auth/strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy, ValidateUserUseCase, SignInUsecase],
  imports: [
    DatabaseModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRE,
      },
    }),
  ],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignInDTOValidateMiddleware).forRoutes('/signIn');
  }
}
