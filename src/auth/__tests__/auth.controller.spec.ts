import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../../auth/auth.service';
import { loginUserMock } from '../__mocks__/login-user.mock';
import { ReturnLoginMock } from '../__mocks__/return-login.mock';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue(ReturnLoginMock),
          },
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(authService).toBeDefined();
  });

  it('should return user login', async () => {
    const userLogin = await controller.login(loginUserMock);
    expect(userLogin).toEqual(ReturnLoginMock);
  });
});
