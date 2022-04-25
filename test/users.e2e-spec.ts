import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test
    .createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  describe('DB operations',()=>{
    // it('Creating new user', () => {
    //     return request(app.getHttpServer())
    //       .post('/users/create')
    //       .send({
    //         username: 'jfjds',
    //         password: '123456',
    //         email: '1234@gmail.com'
    //       })
    //       .expect(201)
    //   });
    
      it('Creating new user with wrong username', () => {
        return request(app.getHttpServer())
          .post('/users/create')
          .send({
            username: 'gg',
            password: '123456',
            email: '1234@gmail.com'
          })
          .expect(400)
      });
    
    //   it('Creating new user with wrong password', () => {
    //     return request(app.getHttpServer())
    //       .post('/users/create')
    //       .send({
    //         username: 'jfjds',
    //         password: '123',
    //         email: '1234@gmail.com'
    //       })
    //       .expect(400)
    //   });
  })
  
});
