import {
  Controller,
  Post,
  Body,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { BaseInfoService } from './base-info.service';
import { CreateBaseExamInfoDto } from '../../dto/base-info.dto';
@Controller('base-info')
export class BaseInfoController {
  constructor(private readonly baseInfoService: BaseInfoService) {}
  @Post('save')
  async save(@Body() createDto: CreateBaseExamInfoDto) {
    try {
      return await this.baseInfoService.save(createDto);
    } catch (error) {
      throw new HttpException('基础数据插入数据库失败', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * 查询基础信息
   *
   * 算法可能需要
   */
  @Get('query')
  query(@Query('userId') userId: number) {
    return this.baseInfoService.findByUserId(userId);
  }
}
