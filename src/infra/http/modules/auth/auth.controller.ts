import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthRequestModel } from './models/auth-request.model';
import { SignInUsecase } from '../../../../modules/auth/use-cases/sign-in-usecase/sign-in-usecase';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/is-public.decorator';
import { AuthenticatedRequestModel } from "./models/authenticated-request.model";

@Controller()
export class AuthController {
  constructor(private SignInUsecase: SignInUsecase) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  async signIn(@Request() request: AuthRequestModel) {
    const access_token = await this.SignInUsecase.execute({
      user: request.user,
    });
    return { access_token };
  }

  @Get('test')
  async test(@Request() request: AuthenticatedRequestModel) {
    return request.user;
  }
}
