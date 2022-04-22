import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { send } from 'process';
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
  })
});
