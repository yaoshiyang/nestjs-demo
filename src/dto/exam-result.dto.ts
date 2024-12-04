import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export class ExamResultdDto {
  @ApiProperty({ description: '当前页' })
  readonly currentPage: number;

  @ApiProperty({ description: '当前条数' })
  readonly pageSize: number;

  @ApiProperty({ description: '查询日期' })
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  readonly dataTime?: Date;

  @ApiProperty({ description: '类别' })
  readonly category: string;

  @ApiProperty({ description: '知识点' })
  readonly knowlege: string;
}
