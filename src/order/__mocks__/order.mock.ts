import { paymentMock } from "../../payment/__mocks__/payment.mock";
import { addressMock } from "../../address/__mocks__/address.mock";
import { OrderEntity } from "../entities/order.entity";
import { userEntityMock } from "../../user/__mocks__/user.mock";

export const orderMock: OrderEntity = {
    addressId: addressMock.id,
    createdAt: new Date(),
    updatedAt: new Date(),
    date: new Date(),
    id: 1,
    paymentId: paymentMock.id,
    userId: userEntityMock.id,
}