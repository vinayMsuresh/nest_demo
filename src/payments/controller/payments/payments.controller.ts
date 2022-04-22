import { Controller, Get, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';

@Controller('payments')
export class PaymentsController {
    @Get()
    getPayment(@Req() request: Request, @Res() response: Response){
        const { count, page} = request.query;
        if( !count || !page) {
            response.
            status(400).
            send({msg: 'Missing page or count parameter'});
        } 
        else {
            response.status(200);
        }
    }
}
