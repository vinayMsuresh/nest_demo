import { Module } from '@nestjs/common';
import { CustomersController } from './controller/customers/customers.controller';
import { CustomersService } from './service/customers/customers.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
