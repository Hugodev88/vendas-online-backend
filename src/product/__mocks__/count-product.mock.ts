import { categoryMock } from '../../category/__mocks__/category.mock';
import { CountProductDto } from '../dtos/countProduct.dto';

export const countProductMock: CountProductDto = {
  category_id: categoryMock.id,
  total: 20,
};
