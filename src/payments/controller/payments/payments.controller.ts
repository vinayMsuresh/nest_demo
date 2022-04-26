import { Controller, Get, Req, Res,Inject, Post, Body } from '@nestjs/common';
import { Response, Request } from 'express';
import { PaymentDto } from '../../dtos/payment.dto';
import { PaymentsService } from '../../service/payments/payments.service';

@Controller('payments')
export class PaymentsController {
    constructor(@Inject('PAYMENT_SERVICE') private readonly paymentsService: PaymentsService){}
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


    @Post('create')
    async createPayment(@Body() paymentDto: PaymentDto){
        return await this.paymentsService.createPayment(paymentDto);
    }
}
