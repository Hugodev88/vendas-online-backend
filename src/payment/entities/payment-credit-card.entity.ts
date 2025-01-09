import { ChildEntity, Column } from 'typeorm';
import { PaymentEntity } from './payment.entity';
import { CreateOrderDto } from '../../order/dtos/create-order.dto';

@ChildEntity('credit_card')
export class PaymentCreditCardEntity extends PaymentEntity {
  @Column({ name: 'amount_payments', nullable: false })
  amountPayments: number;

  constructor(
    statusId: number,
    price: number,
    discount: number,
    finalPrice: number,
    createOrder: CreateOrderDto,
  ) {
    super(statusId, price, discount, finalPrice);
    this.amountPayments = createOrder?.amountPayments || 0;
  }
}
