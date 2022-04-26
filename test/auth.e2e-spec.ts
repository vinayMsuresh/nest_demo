import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm/out';
import { getRepository, getTreeRepository} from 'typeorm';
import { SessionEntity } from '../src/typeOrm';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    const sessionRepository = getRepository(SessionEntity);
  // app.setGlobalPrefix('api');
    app.use(
        session({
        secret: 'asdsdswemndkadlad',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000,
        },
        store: new TypeormStore().connect(sessionRepository)
        }),
    )
    app.use(passport.initialize());
    app.use(passport.session());
    await app.init();
  });


  let cookie = '';
  it('users login', (done) => {
    request(app.getHttpServer())
      .post('/auth/login')
      .send({
          username: 'user3',
          password: '123456'
      })
      .expect(201)
      .end((err, res)=>{
        console.log(res.headers);
        cookie = res.headers['set-cookie'];
        done();
      })
  });

  it('should pass status url', ()=>{
      return request(app.getHttpServer())
        .get('/auth/status')
        .set('Cookie',cookie)
        .expect(200);
  })
});
