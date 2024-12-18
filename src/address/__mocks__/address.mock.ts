import { cityMock } from "../../city/__mocks__/city.mock";
import { AddressEntity } from "../entities/address.entity";
import { userEntityMock } from "../../user/__mocks__/user.mock";

export const addressMock: AddressEntity = {
    cep: '12321123',
    cityId: cityMock.id,
    complement: "dasda",
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 32132,
    numberAddress: 32,
    userId: userEntityMock.id,
}