import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User1 } from '../../../typeOrm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import * as bcryptUtils from '../../../utils/bcrypt';
describe('UsersService', () => {
  let service: UsersService;
  let userRepository:Repository<User1>;
  const USER_REP_TOKEN = getRepositoryToken(User1);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,{
        provide: USER_REP_TOKEN,
        useValue: {
          create: jest.fn(),
          save: jest.fn(),
          findOne: jest.fn()
        }
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User1>>(USER_REP_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('repository should be defined', ()=>{
    expect(userRepository).toBeDefined();
  });

  describe('Create user', ()=>{
    jest
        .spyOn(bcryptUtils, 'encodePassword')
        .mockReturnValue('hashed233');
    it('should be new user with encoded password',async()=>{      
        await service.createUser({
          username: 'Vinanm',
          email: 'vnnam@gmail.com',
          password: '123456',
        });

        expect(bcryptUtils.encodePassword).toHaveBeenCalledWith('123456');
    });

    it('should call user.Repository.create with correct params', async()=>{
      await service.createUser({
        username: 'Vinanm',
        email: 'vnnam@gmail.com',
        password: '123456',
      });

      expect(userRepository.create).toHaveBeenCalledWith({
        username: 'Vinanm',
        email: 'vnnam@gmail.com',
        password: 'hashed233',
      });

      // expect(userRepository.create);
    })

    it('should call user.Repository.create with correct params', async()=>{
      jest.spyOn(userRepository, 'create').mockReturnValueOnce({
        id:1,
        username: 'Vinanm',
        email: 'vnnam@gmail.com',
        password: 'hashed233',
      });
      await service.createUser({
        username: 'Vinanm',
        email: 'vnnam@gmail.com',
        password: '123456',
      });

      expect(userRepository.save).toHaveBeenCalledWith({
        id:1,
        username: 'Vinanm',
        email: 'vnnam@gmail.com',
        password: 'hashed233',
      })
    })

  })
});
