import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { customerDto } from 'src/customers/dtos/customer.dto';
import { CustomersService } from 'src/customers/service/customers/customers.service';
@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}
  @Get(':id')
  getCustomer(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const customer = this.customerService.findCustomerById(id);
    if (customer) {
      res.send(customer);
    } else {
      res.status(400).send('Customer not found');
    }
  }

  @Get('/search/:id')
  searchCustomer(@Param('id', ParseIntPipe) id: number) {
    const customer = this.customerService.findCustomerById(id);
    if (customer) return customer;
    else throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  createCustomer(@Body() body: customerDto) {
    this.customerService.addCustomer(body);
    return 'Customer added successfully';
  }

  @Get('')
  getAllCustomer() {
    return this.customerService.getCustomer();
  }
}
