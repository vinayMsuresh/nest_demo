import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { PaymentsService } from '../../service/payments/payments.service';
import { PaymentsController } from './payments.controller';

describe('PaymentsController', () => {
  const req = {
    query:{}
  } as unknown as Request;
  const ressend = { send: jest.fn((y)=>y),}
  const res = {
    status: jest.fn((x)=>ressend),
    send: jest.fn((x)=>x),
  } as unknown as Response;
  let controller: PaymentsController;
  let paymentService: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers:[{
        provide:'PAYMENT_SERVICE',
        useValue:{
          createPayment: jest.fn((x) => x)
        }
      }]
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    paymentService = module.get<PaymentsService>('PAYMENT_SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(paymentService).toBeDefined();
  });

  describe('testing the payment module', ()=>{
    it('should return 400 status',()=> {
      controller.getPayment(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(ressend.send).toHaveBeenCalledWith({
          msg: 'Missing page or count parameter'
      })
    });

    it('should return status 200',()=>{
      req.query={
        count: '10',
        page: '1'
      }
      controller.getPayment(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect
    })
  });

  describe('Testing the create payment', ()=> {
    it('should return error', async()=>{    
      jest.spyOn(paymentService, 'createPayment').mockImplementationOnce(() => {
        throw new BadRequestException;
      });

      try{     
        const response = await controller.createPayment({
          email: 'msinay@gmail.com',
          price: 1221,
        });
      } 
      catch(err){
        console.log(err);
      }
    })
  })
});
