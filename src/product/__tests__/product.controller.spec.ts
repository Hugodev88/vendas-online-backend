import { Test, TestingModule } from '@nestjs/testing';
import { returnDeleteMock } from '../../__mocks__/return-delete.mock';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { productMock } from '../__mocks__/product.mock';
import { createProductMock } from '../__mocks__/create-product.mock';
import { updateProductMock } from '../__mocks__/update-product.mock';

describe('ProductService', () => {
  let controller: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([productMock]),
            createProduct: jest.fn().mockResolvedValue(productMock),
            deleteProduct: jest.fn().mockResolvedValue(returnDeleteMock),
            updateProduct: jest.fn().mockResolvedValue(productMock),
          },
        },
      ],
      controllers: [ProductController],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(productService).toBeDefined();
  });

  it('should return productEntity in findAll', async () => {
    const products = await controller.findAll();
    expect(products).toEqual([
      {
        id: productMock.id,
        name: productMock.name,
        price: productMock.price,
        image: productMock.image,
      },
    ]);
  });

  it('should return productEntity in createProduct', async () => {
    const product = await controller.createProduct(createProductMock);
    expect(product).toEqual(productMock);
  });

  it('should return DeleteResult in deleteProduct', async () => {
    const product = await controller.deleteProduct(productMock.id);
    expect(product).toEqual(returnDeleteMock);
  });

  it('should return productEntity in updateProduct', async () => {
    const product = await controller.updateProduct(
      updateProductMock,
      productMock.id,
    );
    expect(product).toEqual(productMock);
  });
});
