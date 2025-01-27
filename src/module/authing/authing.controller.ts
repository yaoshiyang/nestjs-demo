import {
  Body,
  Controller,
  Post,
  Get,
  Headers,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthingService } from './authing.service';
import { LoginDto } from 'src/dto/login.dto';
import { SaveUserDto } from 'src/dto/save-user.dto';
import { AuthingGuard } from 'src/guard/authing/authing.guard';

interface CustomRequest extends Request {
  user?: {
    userId: string;
  };
}
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

  @Post('save')
  @UseGuards(AuthingGuard)
  async saveUserInfo(
    @Body() payLoad: SaveUserDto,
    @Req() request: CustomRequest,
  ) {
    const userId = request.user!.userId;
    const result = await this.authingService.createUser(userId, payLoad);
    return result;
  }

  @Get('userInfo')
  @UseGuards(AuthingGuard)
  async getLocalUserInfo(@Req() request: CustomRequest) {
    const userId = request.user!.userId;
    const userInfo = await this.authingService.getLocalUserInfo(userId);
    return userInfo;
  }
}
