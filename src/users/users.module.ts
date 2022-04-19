import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidateCustomer } from 'src/middlewares/ValidateAccount.middleware';
import { ValidateCustomerMiddleware } from 'src/middlewares/validateCustomer.middleware';
import { User1 } from 'src/typeOrm';
import { UsersController } from './controller/users/users.controller';
import { UsersService } from './service/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User1])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule 
implements NestModule 
{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateCustomerMiddleware, ValidateCustomer)
      .exclude({
        path: 'users/:username',
        method: RequestMethod.GET,
      })
      .forRoutes({
        path: 'users',
        method: RequestMethod.GET,
      });
  }
}
