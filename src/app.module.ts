import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { UsersController } from './users/controller/users/users.controller';
import { UsersService } from './users/service/users/users.service';
import { UsersModule } from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import entities from './typeOrm';

@Module({
  imports: [
    CustomersModule, 
    UsersModule, 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'db1',
      entities,
      synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
