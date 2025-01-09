import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';
import { OrderService } from './order.service';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('order')
export class OrderController {

    constructor (
        private readonly orderService: OrderService,
    ) {}

    @Post()
    @UsePipes(ValidationPipe)
    async createOrder(@Body() createOrder:CreateOrderDto, @UserId() userId: number){
        return this.orderService.createOrder(createOrder, userId)
    }

    @Get()
    async findOrdersByUserId(@UserId() userId: number) {
        return this.orderService.findOrdersByUserId(userId)
    }
    
}
