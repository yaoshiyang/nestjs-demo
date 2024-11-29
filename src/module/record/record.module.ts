import { Module } from '@nestjs/common';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamResult } from './record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExamResult])],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
