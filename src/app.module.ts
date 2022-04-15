import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { UsersController } from './users/controller/users/users.controller';
import { UsersService } from './users/service/users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CustomersModule, UsersModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
