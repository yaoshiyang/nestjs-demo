import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthingService } from 'src/module/authing/authing.service';

@Injectable()
export class AuthingGuard implements CanActivate {
  constructor(private readonly authService: AuthingService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization?.split(' ')[0];
    if (!token) return false;
    const result = await this.authService.verifyToken(token);
    if (result) {
      const userInfo = await this.authService.getUserInfo(token);
      if (userInfo) request.user = userInfo;
    }
    return !!result;
  }
}
