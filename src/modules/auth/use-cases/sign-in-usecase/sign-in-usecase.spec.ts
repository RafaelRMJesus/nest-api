import { SignInUsecase } from './sign-in-usecase';
import { JwtService } from '@nestjs/jwt';
import { makeUser } from '../../../user/factories/user.factory';
import { UserPayload } from '../../models/user.payload';

let jwtService: JwtService;
let signInUsecase: SignInUsecase;

describe('Sign In UseCase', () => {
  beforeEach(() => {
    jwtService = new JwtService({ secret: 'secret' });
    signInUsecase = new SignInUsecase(jwtService);
  });

  it('should be able to create a valid access_token', async () => {
    const user = makeUser({});

    const token = await signInUsecase.execute({ user });

    const payload = jwtService.decode(token) as UserPayload;

    expect(payload.sub).toEqual(user.id);
  });
});
