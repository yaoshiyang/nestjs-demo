import { Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Put('list/user')
  updateUser() {
    userId: 1;
  }

  @Put('list/:id') // 会匹配到 list/user所以要放在上面
  update() {
    userId: 1;
  }

  @Post()
  create(): string {
    return 'success';
  }
}
