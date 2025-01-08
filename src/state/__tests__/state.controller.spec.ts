import { Test, TestingModule } from '@nestjs/testing';
import { stateMock } from '../__mocks__/state.mock';
import { StateService } from '../state.service';
import { StateController } from '../state.controller';

describe('StateService', () => {
  let controller: StateController;
  let stateService: StateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: StateService,
          useValue: {
            getAllState: jest.fn().mockResolvedValue([stateMock]),
          },
        }
      ],
      controllers: [StateController],
    }).compile();

    controller = module.get<StateController>(StateController);
    stateService = module.get<StateService>(StateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(stateService).toBeDefined();
  });
  
  it('should return states in createProduct', async () => {
    const states = await controller.getAllState();
    expect(states).toEqual([stateMock]);
  });
  
});
