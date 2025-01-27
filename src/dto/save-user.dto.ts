import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class SaveUserDto {
  @ApiProperty({ description: '考试年级' })
  @IsNotEmpty({ message: '考试年级不可为空' })
  grade: string;

  @ApiProperty({ description: '考试地点' })
  @IsNotEmpty({ message: '考试地点不可为空' })
  location: string;

  @ApiProperty({ description: '考试学科' })
  @IsNotEmpty({ message: '考试学科不可为空' })
  subject: number;

  @ApiProperty({ description: 'vip次数' })
  vip: number;
}
