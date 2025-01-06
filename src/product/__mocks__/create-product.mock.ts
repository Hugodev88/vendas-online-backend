import { categoryMock } from "../../category/__mocks__/category.mock";
import { CreateProductDto } from "../dtos/createProduct.dto";

export const createProductMock: CreateProductDto = {
    categoryId: categoryMock.id,
    name: 'Sample Product',
    price: 99.99,
    image: "https://sample"
};