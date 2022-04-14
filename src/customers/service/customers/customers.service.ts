import { Injectable } from '@nestjs/common';
import { customerDto } from 'src/customers/dtos/customer.dto';
import { customerTypes } from 'src/types/customersType';

@Injectable()
export class CustomersService {
  private customers: customerTypes[] = [
    {
      id: 1,
      email: 'msv@gmail.com',
      name: 'Vinay S',
    },
    {
      id: 2,
      email: 'msvinay@gmail.com',
      name: 'Vinay M S',
    },
    {
      id: 3,
      email: 'abc@gmail.com',
      name: 'Abcx',
    },
  ];
  findCustomerById(id: number) {
    return this.customers.find((user) => user.id === id);
  }

  addCustomer(customer: customerDto) {
    this.customers.push(customer);
  }

  getCustomer() {
    return this.customers;
  }
}
