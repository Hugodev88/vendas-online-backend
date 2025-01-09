import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '213132321',
  createdAt: new Date(),
  email: 'emailmock@gamil.com',
  id: 43243,
  name: 'namemock',
  password: '$2b$10$E1kPmU8YNJmhb1Xq9DzDyuYQDHdpizpAmBIsU/Ok4y3mbJjqqczzG',
  phone: '312321321',
  typeUser: UserType.User,
  updatedAt: new Date(),
};
