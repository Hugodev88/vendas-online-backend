import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { CategoryModule } from '../category/category.module'; // Importe o CategoryModule

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), CategoryModule], // Agora você importa o CategoryModule
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
