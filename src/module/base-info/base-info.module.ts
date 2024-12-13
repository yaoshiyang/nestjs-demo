import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseInfoController } from './base-info.controller';
import { BaseInfoService } from './base-info.service';
import { BaseInfoEntity } from '../../entities/base-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BaseInfoEntity])],
  controllers: [BaseInfoController],
  providers: [BaseInfoService],
})
export class BaseInfoModule {}
