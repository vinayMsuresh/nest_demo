import { Controller, Get, Post, Req, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthenticateGuard, LocalAuthGuard } from 'src/auth/utils/LocalGuard';

@Controller('auth')
export class AuthController {
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req) {}

    @Get('')
    async getAuthSession(@Session() session: Record<string, any>){
        session.authenticate = true;
        return session;
    }

    @UseGuards(AuthenticateGuard)
    @Get('status')
    async getSessionStatus(@Req() req: Request){
        return req.user;
    }

}
