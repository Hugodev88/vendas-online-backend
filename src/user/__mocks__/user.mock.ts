import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/user-type.enum";

export const userEntityMock: UserEntity = {
    cpf: "213132321",
    createdAt: new Date(),
    email: "emailmock@gamil.com",
    id: 43243,
    name: "namemock",
    password: "largepassowrd",
    phone: "312321321",
    typeUser: UserType.User,
    updatedAt: new Date(),
};