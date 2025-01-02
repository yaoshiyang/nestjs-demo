import { Injectable, ForbiddenException } from '@nestjs/common';
import { AuthenticationClient } from 'authing-node-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthingService {
  private readonly authing: AuthenticationClient;

  constructor(private readonly configService: ConfigService) {
    this.authing = new AuthenticationClient({
      appSecret: this.configService.get('AUTHING_SECRET'),
      appId: this.configService.get('AUTHING_APP_ID'),
      appHost: this.configService.get('AUTHING_HOST'),
    });
  }

  async login(phone: string, password: string) {
    try {
      const loginRes = await this.authing.signInByPhonePassword({
        phone,
        password,
      });
      if (loginRes.statusCode !== 200) throw new ForbiddenException('登录失败');
      const accessToken = loginRes.data.access_token;
      this.authing.setAccessToken(accessToken);
      return loginRes;
    } catch (e) {
      console.log(e);
    }
  }

  async getUserInfo(token: string) {
    this.authing.setAccessToken(token);
    const result = await this.authing.getProfile({ withCustomData: true });
    return result.data;
  }

  async verifyToken(token: string) {
    const result = await this.authing.introspectToken(token);
    return result.active;
  }
}
