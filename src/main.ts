import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm/out';
import { getRepository, getTreeRepository} from 'typeorm';
import { SessionEntity } from './typeOrm';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
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
  await app.listen(3000);
}
bootstrap();
