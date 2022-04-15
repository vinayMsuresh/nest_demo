import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { slideUsers, userTypes } from 'src/types/usertypes';

@Injectable()
export class UsersService {
  private users: userTypes[] = [
    {
      username: 'sdsds',
      password: 'sdsdsdsds',
    },
    {
      username: 'abcd',
      password: 'abcd',
    },
  ];

  getUsers() {
    return this.users.map((user) => new slideUsers(user));
  }
  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
