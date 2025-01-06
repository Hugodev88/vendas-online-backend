import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { ReturnProductDto } from './dtos/returnProduct.dto';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/createProduct.dto';
import { ProductEntity } from './entities/product.entity';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {

    constructor(
        private readonly productService: ProductService,
    ){}

    @Get()
    async findAll(): Promise<ReturnProductDto[]> {
        return (await this.productService.findAll()).map((product) => new ReturnProductDto(product))
    }

    @Roles(UserType.Admin)
    @UsePipes(ValidationPipe)
    @Post()
    async createProduct(@Body() createProduct: CreateProductDto): Promise<ProductEntity> {
        return this.productService.createProduct(createProduct)
    }

}
