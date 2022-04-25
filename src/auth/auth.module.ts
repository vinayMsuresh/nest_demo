import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User1 } from '../typeOrm';
import { UsersService } from '../users/service/users/users.service';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './service/auth/auth.service';
import { LocalStrategy } from './utils/LocalStrategy';
import { sessionSerializer } from './utils/SessionSerializer';


@Module({
  imports:[TypeOrmModule.forFeature([User1]), PassportModule.register({session: true})],
  controllers: [AuthController],
  providers: [{
    provide: 'AUTH_SERVICE',
    useClass: AuthService
  },
  {
    provide: 'USER_SERVICE',
    useClass: UsersService
  },
  LocalStrategy,
  sessionSerializer
]
})
export class AuthModule {}
