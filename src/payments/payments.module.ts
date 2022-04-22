import { Module } from '@nestjs/common';
import { PaymentsController } from './controller/payments/payments.controller';
import { PaymentsService } from './service/payments/payments.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule {}
