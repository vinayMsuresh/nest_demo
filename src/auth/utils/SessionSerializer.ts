import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import {UsersService} from '../../users/service/users/users.service';
import {User1} from '../../typeOrm/Users';
export class sessionSerializer extends PassportSerializer {
    constructor(@Inject('USER_SERVICE') private readonly userService: UsersService){
        super();
    }

    serializeUser(user: User1, done: (err, user: User1)=> void) {
        console.log('Serialize User');
        done(null,user);
    }

    async deserializeUser(user: User1, done: (err, user: User1)=> void) {
        console.log('Deserializer');
        const userDB = await this.userService.findUserById(user.id);
        return userDB ? done(null, userDB) : done(null, null);
    }
}