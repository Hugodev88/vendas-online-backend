import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InsertCartDto } from './dtos/insert-cart.dto';
import { CartProductService } from '../cart-product/cart-product.service';
import { UpdateCartDto } from './dtos/update-cart.dto';

const LINE_AFFECTED = 1;

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly cartProductService: CartProductService,
  ) {}

  async clearCart(userId: number): Promise<DeleteResult> {
    const cart = await this.findCartByUserId(userId);

    await this.cartRepository.save({
      ...cart,
      active: false,
    });

    return {
      raw: [],
      affected: LINE_AFFECTED,
    };
  }

  async findCartByUserId(
    userId: number,
    isRelations?: boolean,
  ): Promise<CartEntity> {
    const relations = isRelations
      ? { cartProduct: { product: true } }
      : undefined;
    const cart = await this.cartRepository.findOne({
      where: { userId, active: true },
      relations,
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async createCart(userId: number): Promise<CartEntity> {
    return this.cartRepository.save({ userId, active: true });
  }

  async insertProductInCart(
    insertCart: InsertCartDto,
    userId: number,
  ): Promise<CartEntity> {
    const cart = await this.findCartByUserId(userId).catch(async () => {
      return this.createCart(userId);
    });
    await this.cartProductService.insertProductInCart(insertCart, cart);
    return cart;
  }

  async deleteProductCart(
    productId: number,
    userId: number,
  ): Promise<DeleteResult> {
    const cart = await this.findCartByUserId(userId);
    return this.cartProductService.deleteProductCart(productId, cart.id);
  }

  async updateProductInCart(
    updateCart: UpdateCartDto,
    userId: number,
  ): Promise<CartEntity> {
    const cart = await this.findCartByUserId(userId).catch(async () => {
      return this.createCart(userId);
    });
    await this.cartProductService.updateProductInCart(updateCart, cart);
    return cart;
  }
}
