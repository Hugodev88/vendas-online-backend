import { productMock } from "../../product/__mocks__/product.mock";
import { orderMock } from "../../order/__mocks__/order.mock";
import { OrderProductEntity } from "../entities/order-product.entity";

export const orderProductMock: OrderProductEntity = {
    amount: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 1,
    orderId: orderMock.id,
    price: 10,
    productId: productMock.id,
}