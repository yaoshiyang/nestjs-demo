import { Injectable, ForbiddenException } from '@nestjs/common';
import { AuthenticationClient } from 'authing-node-sdk';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthingService {
  private readonly authing: AuthenticationClient;

  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
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
    try {
      await this.authing.parseIDToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async createUser(userId: string, payLoad: any) {
    const defaultValue = { vip: 0, category: 0, level: 0 };
    const user = this.userRepository.create({
      userId,
      ...defaultValue,
      ...payLoad,
    });
    return await this.userRepository.save(user);
  }

  async getLocalUserInfo(userId: string) {
    const result = await this.userRepository.findOne({ where: { userId } });
    console.log('查询userId', userId);
    console.log('查询userId', result);
    return result;
  }
}
