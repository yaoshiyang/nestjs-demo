import { Test, TestingModule } from '@nestjs/testing';
import { AuthingService } from './authing.service';

describe('AuthingService', () => {
  let service: AuthingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthingService],
    }).compile();

    service = module.get<AuthingService>(AuthingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
