import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class SaveExamRecordDto {
  @ApiProperty({ description: '记录Id' })
  id?: number;

  @ApiProperty({ description: '考试Id' })
  @IsNotEmpty({ message: '考试Id不可为空' })
  examId: number;

  @ApiProperty({ description: '题目Id' })
  @IsNotEmpty({ message: '题目Id不可为空' })
  questionId: number;

  @ApiProperty({ description: '用户回答' })
  @IsNotEmpty({ message: '用户回答不可为空' })
  readonly userAnswer: string;

  @ApiProperty({ description: '用户语音' })
  readonly userAudio: Express.Multer.File;

  @ApiProperty({ description: '用户回答开始时间' })
  @IsNotEmpty({ message: '用户回答开始时间不可为空' })
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  readonly startDate: Date;

  @ApiProperty({ description: '用户回答开始时间' })
  @IsNotEmpty({ message: '用户回答开始时间不可为空' })
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  readonly endDate: Date;
}
