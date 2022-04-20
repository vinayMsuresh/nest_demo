import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../service/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService,){
        super();
    }

    async validate(username: string, password: string){
        console.log('Inside LocalStrategy');
        console.log(username);
        const user = await this.authService.validateUser(username, password);
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}