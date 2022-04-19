import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { slideUsers } from 'src/types/usertypes';
import { CreateUserDto } from 'src/users/dtos/ceateUser.dto';
import { UserNotFound } from 'src/users/exceptions/userNotFound.exception';
import { HttpExceptionFilter } from 'src/users/filters/HttpExceptions.filter';
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
  @UseFilters(HttpExceptionFilter)
  @Get('/:username')
  getUserByName(@Param('username') username: string) {
    const user = this.userService.getUserByUsername(username);
    if (user) return new slideUsers(user);
    else throw new UserNotFound('User not Found', HttpStatus.BAD_GATEWAY);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  saveUser(@Body() createUser: CreateUserDto){
    return this.userService.createUser(createUser);
  }
}
