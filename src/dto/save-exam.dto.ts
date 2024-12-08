import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { SaveExamRecordDto } from './save-exam-record.dto';

export class SaveExamDto {
  @ApiProperty({ description: '考试Id' })
  @IsNotEmpty({ message: '考试Id不可为空' })
  id?: number;

  @ApiProperty({ description: '考试结束时间' })
  @IsNotEmpty({ message: '用户回答开始时间不可为空' })
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  readonly startDate: Date;

  @ApiProperty({ description: '考试结束时间' })
  @IsNotEmpty({ message: '用户回答开始时间不可为空' })
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  readonly endDate: Date;

  @ApiProperty({ description: '考试类型' })
  @IsNotEmpty({ message: '考试类型不可为空' })
  category: string;

  @ApiProperty({ description: '考试年级' })
  @IsNotEmpty({ message: '考试年级不可为空' })
  grade: string;

  @ApiProperty({ description: '考试地点' })
  @IsNotEmpty({ message: '考试地点不可为空' })
  location: string;

  @ApiProperty({ description: '考试记录' })
  @IsNotEmpty({ message: '考试记录不可为空' })
  @ValidateNested() // 验证嵌套对象
  @Type(() => SaveExamRecordDto) // 指定转换类型
  readonly examRecords: SaveExamRecordDto[];
}
