import { CreateUserUsecase } from './create-user.usecase';
import { UserMockRepository } from '../../repositories/user-mock.repository';
import { compare } from 'bcrypt';

let createUserUsecase: CreateUserUsecase;
let userRepositoryMock: UserMockRepository;

describe('Create User', () => {
  beforeEach(() => {
    userRepositoryMock = new UserMockRepository();
    createUserUsecase = new CreateUserUsecase(userRepositoryMock);
  });

  it('should be able to create a user', async () => {
    expect(userRepositoryMock.users).toEqual([]);

    const user = await createUserUsecase.execute({
      name: 'rafa',
      email: 'rafa@mail.com',
      password: '123456',
    });

    expect(userRepositoryMock.users).toEqual([user]);
  });

  it('should be able to create user with encrypted password', async () => {
    const userPasswordWithoutEncryption = '123456';

    const user = await createUserUsecase.execute({
      name: 'rafa',
      email: 'rafa@mail.com',
      password: userPasswordWithoutEncryption,
    });

    const userHasEncryptedPassword = await compare(
      userPasswordWithoutEncryption,
      user.password,
    );

    expect(userHasEncryptedPassword).toBeTruthy();
  });
});
