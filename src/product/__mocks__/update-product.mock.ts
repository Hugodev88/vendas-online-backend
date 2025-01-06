import { categoryMock } from "../../category/__mocks__/category.mock";
import { UpdateProductDto } from "../dtos/updateProduct.dto";

export const updateProductMock: UpdateProductDto = {
    categoryId: categoryMock.id,
    name: 'updated product',
    price: 25.55,
    image: "https://blat"
};