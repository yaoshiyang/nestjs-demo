import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamResultController } from './exam-result.controller';
import { ExamResultService } from './exam-result.service';
import { ExamResultEntity } from '../../entities/exam-result.entity';
import { ExamEntity } from '../../entities/exam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExamResultEntity, ExamEntity])],
  controllers: [ExamResultController],
  providers: [ExamResultService],
})
export class ExamResultModule {}
