import { Test, TestingModule } from '@nestjs/testing';
import { AuthingController } from './authing.controller';

describe('AuthingController', () => {
  let controller: AuthingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthingController],
    }).compile();

    controller = module.get<AuthingController>(AuthingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
