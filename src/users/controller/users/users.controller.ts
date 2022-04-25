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
import { slideUsers } from '../../../types/usertypes'; 
import { CreateUserDto } from '../../dtos/ceateUser.dto';
import { UserNotFound } from '../../exceptions/userNotFound.exception';
import { HttpExceptionFilter } from '../../filters/HttpExceptions.filter';
import { UsersService } from '../../service/users/users.service';

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
