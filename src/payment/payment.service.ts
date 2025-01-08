import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from 'src/order/dtos/create-order.dto';
import { PaymentCreditCardEntity } from './entities/payment-credit-card.entity';
import { PaymentType } from 'src/payment-status/enums/payment-type.enum';
import { PaymentPixEntity } from './entities/payment-pix.entity';

@Injectable()
export class PaymentService {

    constructor (
        @InjectRepository(PaymentEntity)
        private readonly paymentRepository: Repository<PaymentEntity>
    ){}

    async createPayment(createOrder: CreateOrderDto): Promise<PaymentEntity> {

        if(createOrder.amountPayments) {
            const paymentCreditCard = new PaymentCreditCardEntity(PaymentType.Done, 0, 0, 0, createOrder)
            return this.paymentRepository.save(paymentCreditCard);
        } else if (createOrder.codePix && createOrder.datePayment) {
            const paymentPix = new PaymentPixEntity(PaymentType.Done, 0, 0, 0, createOrder)
            return this.paymentRepository.save(paymentPix);
        }

        throw new BadRequestException("Amount payments, code pix or date payment not found")
    }

}
