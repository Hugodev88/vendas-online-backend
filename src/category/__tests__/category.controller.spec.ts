import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../category.controller';
import { CategoryService } from '../category.service';
import { categoryMock } from '../__mocks__/category.mock';
import { createCategoryMock } from '../__mocks__/create-category.mock';

describe('CategoryService', () => {
  let controller: CategoryController;
  let categoryService: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CategoryService,
          useValue: {
            createCategory: jest.fn().mockResolvedValue(categoryMock),
            findAllCategories: jest.fn().mockResolvedValue([categoryMock]),
          },
        },
      ],
      controllers: [CategoryController],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(categoryService).toBeDefined();
  });

  it('should return categoryEntity in createCategory', async () => {
    const category = await controller.createCategory(createCategoryMock);
    expect(category).toEqual(categoryMock);
  });

  it('should return categoryEntity in findAllCategories', async () => {
    const category = await controller.findAllCategories();
    expect(category).toEqual([categoryMock]);
  });
});
