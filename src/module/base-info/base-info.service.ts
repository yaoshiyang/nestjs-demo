import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseInfoEntity } from './base-info.entity';
import { Repository } from 'typeorm';
import { CreateBaseExamInfoDto } from '../../dto/base-info.dto';
@Injectable()
export class BaseInfoService {
  constructor(
    @InjectRepository(BaseInfoEntity)
    private readonly baseInfoRepository: Repository<BaseInfoEntity>,
  ) {}

  // 保存基础信息
  async save(body: CreateBaseExamInfoDto) {
    return await this.baseInfoRepository.save(body);
  }

  // 根据用户id保存
  async findByUserId(id: number) {
    return await this.baseInfoRepository.findOne({ where: { user_id: id } });
  }
}
