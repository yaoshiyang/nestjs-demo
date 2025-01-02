import { Body, Controller, Post, Get, Headers } from '@nestjs/common';
import { AuthingService } from './authing.service';
import { LoginDto } from 'src/dto/login.dto';
@Controller('authing')
export class AuthingController {
  constructor(private readonly authingService: AuthingService) {}

  @Post('login')
  async toLogin(@Body() payLoad: LoginDto) {
    return await this.authingService.login(payLoad.phone, payLoad.password);
  }

  @Get('profile')
  async getUserInfo(@Headers('authorization') authorization: string) {
    if (!authorization) return null;
    return await this.authingService.getUserInfo(authorization);
  }

  @Get('active')
  async isActive(@Headers('authorization') authorization: string) {
    return await this.authingService.verifyToken(authorization);
  }
}
