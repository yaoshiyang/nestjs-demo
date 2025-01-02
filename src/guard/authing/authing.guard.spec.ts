import { AuthingGuard } from './authing.guard';

describe('AuthingGuard', () => {
  it('should be defined', () => {
    expect(new AuthingGuard()).toBeDefined();
  });
});
