import { UserMockRepository } from '../../../user/repositories/user-mock.repository';
import { ValidateUserUseCase } from './validate-user-usecase';
import { hash } from 'bcrypt';
import { makeUser } from '../../../user/factories/user.factory';
import { UnauthorizedException } from '@nestjs/common';

let userRepositoryMock: UserMockRepository;
let validateUserUsecase: ValidateUserUseCase;

describe('Validate User', () => {
  beforeEach(() => {
    userRepositoryMock = new UserMockRepository();
    validateUserUsecase = new ValidateUserUseCase(userRepositoryMock);
  });

  it('should be able to return user when credentials are correct', async () => {
    const userPasswordWithoutEncryption = '123456';

    const user = makeUser({
      password: await hash(userPasswordWithoutEncryption, 10),
    });

    userRepositoryMock.users = [user];

    const result = validateUserUsecase.execute({
      email: user.email,
      password: userPasswordWithoutEncryption,
    });

    expect(result).toEqual(user);
  });

  it('should be able to throw an error when the credentials are incorrect', async () => {
    const userPasswordWithoutEncryption = '123456';

    const user = makeUser({
      password: await hash(userPasswordWithoutEncryption, 10),
    });

    userRepositoryMock.users = [user];

    await expect(async () => {
      await validateUserUsecase.execute({
        email: 'incorrect@mail.com',
        password: userPasswordWithoutEncryption,
      });
    }).rejects.toThrow(UnauthorizedException);

    await expect(async () => {
      await validateUserUsecase.execute({
        email: user.email,
        password: 'incorrect password',
      });
    }).rejects.toThrow(UnauthorizedException);
  });
});
