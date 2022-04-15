import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { slideUsers } from 'src/types/usertypes';
import { UsersService } from 'src/users/service/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  getUsers() {
    return this.userService.getUsers();
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:username')
  getUserByName(@Param('username') username: string) {
    const user = this.userService.getUserByUsername(username);
    if (user) return new slideUsers(user);
    else throw new HttpException('user not found', HttpStatus.NOT_FOUND);
  }
}
