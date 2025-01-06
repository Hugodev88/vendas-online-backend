import { categoryMock } from "../../category/__mocks__/category.mock";
import { ProductEntity } from "../entities/product.entity";

export const productMock: ProductEntity = {
    categoryId: categoryMock.id,
    createdAt: new Date(),
    id: 1,
    image: "https://image.com",
    updatedAt: new Date(),
    name: "name product mock",
    price: 50.3
}