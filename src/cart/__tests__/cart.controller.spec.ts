import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../cart.service';
import { CartController } from '../cart.controller';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { insertCartMock } from '../__mocks__/insert-cart.mock';
import { cartMock } from '../__mocks__/cart.mock';
import { returnDeleteMock } from '../../__mocks__/return-delete.mock';
import { updateCartMock } from '../__mocks__/update-cart.mock';

describe('CartService', () => {
  let controller: CartController;
  let cartService: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CartService,
          useValue: {
            insertProductInCart: jest.fn().mockResolvedValue(cartMock),
            findCartByUserId: jest.fn().mockResolvedValue(cartMock),
            clearCart: jest.fn().mockResolvedValue(returnDeleteMock),
            updateProductInCart: jest.fn().mockResolvedValue(cartMock),
          },
        }
      ],
      controllers: [CartController],
    }).compile();

    controller = module.get<CartController>(CartController);
    cartService = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(cartService).toBeDefined();
  });

  it('should return cartEntity in createCart', async () => {
    const cart = await controller.createCart(insertCartMock, userEntityMock.id);
    expect(cart).toEqual({
      id: cartMock.id,
    });
  });

  it('should return cartEntity in findCartByUserId', async () => {
    const cart = await controller.findCartByUserId(userEntityMock.id);
    expect(cart).toEqual({
      id: cartMock.id,
    });
  });
  
  it('should return deleteResult in clearCart', async () => {
    const cart = await controller.clearCart(userEntityMock.id);
    expect(cart).toEqual(returnDeleteMock);
  });
  
  it('should return cartEntity in updateProductInCart', async () => {
    const cart = await controller.updateProductInCart(updateCartMock, userEntityMock.id);
    expect(cart).toEqual({
      id: cartMock.id,
    });
  });

});
