import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User1 } from 'src/typeOrm';
import { UsersService } from 'src/users/service/users/users.service';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './service/auth/auth.service';
import { LocalStrategy } from './utils/LocalStrategy';


@Module({
  imports:[TypeOrmModule.forFeature([User1]), PassportModule],
  controllers: [AuthController],
  providers: [{
    provide: 'AUTH_SERVICE',
    useClass: AuthService
  },
  {
    provide: 'USER_SERVICE',
    useClass: UsersService
  },
  LocalStrategy
]
})
export class AuthModule {}
