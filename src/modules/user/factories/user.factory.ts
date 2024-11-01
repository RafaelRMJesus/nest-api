import { User } from '../entities/user';

type Override = Partial<User>;

export const makeUser = ({ id, ...override }: Override) => {
  return new User(
    {
      email: 'mail@mail.com',
      name: 'rafa',
      password: '12345',
      ...override,
    },
    id,
  );
};
