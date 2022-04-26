import { BadRequestException, Injectable } from '@nestjs/common';
import { PaymentDto } from '../../dtos/payment.dto';

@Injectable()
export class PaymentsService {
    private users = [
        {email: 'msvinay@gmail.com'},
        {email: 'jayvsajay@gmail.com'},
        {email: 'kirantu@gmail.com'}
    ]
    createPayment(paymentDto: PaymentDto){
        let {email} = paymentDto;
        let users = this.users.find(us=> us.email === email);
        if(users){
            return {
                id: '1',
                status: 'success',
            }
        }
        else{
            throw BadRequestException;
        }

        
    }
}
