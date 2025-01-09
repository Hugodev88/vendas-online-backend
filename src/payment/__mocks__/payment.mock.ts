import { PaymentType } from '../../payment-status/enums/payment-type.enum';
import { PaymentEntity } from '../entities/payment.entity';

export const paymentMock: PaymentEntity = {
  createdAt: new Date(),
  discount: 0,
  finalPrice: 10,
  id: 1,
  price: 10,
  statusId: PaymentType.Done,
  updatedAt: new Date(),
  type: '',
};
