import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { slideUsers, userTypes } from 'src/types/usertypes';
import { CreateUserDto } from 'src/users/dtos/ceateUser.dto';
import { User1 as UserEntity } from 'src/typeOrm/Users';
import { Repository } from 'typeorm';
import { encodePassword } from 'src/utils/bcrypt';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>,){}
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

  createUser(createUser: CreateUserDto){
    const password = encodePassword(createUser.password);
    const newUser = this.userRepository.create({...createUser,password});
    return this.userRepository.save(newUser);
  }

  findUserByUsername(username: string){
    return this.userRepository.findOne({where:{username}})
  }

  findUserById(id: number){
    return this.userRepository.findOne({where:{id}});
  }
}
