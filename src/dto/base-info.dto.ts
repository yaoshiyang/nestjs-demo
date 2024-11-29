import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateBaseExamInfoDto {
  @ApiProperty({ description: '报考地区' })
  @IsNotEmpty({ message: '报考地区不可为空' })
  readonly location: string;

  @ApiProperty({ description: '报考年级' })
  @IsNotEmpty({ message: '报考年级不可为空' })
  readonly grade: number;

  @ApiProperty({ description: '报考学科' })
  @IsNotEmpty({ message: '报考学科不可为空' })
  readonly subject: number;

  @ApiProperty({ description: '是否有面试经验' })
  readonly isExperience: number;

  @ApiProperty({ description: '用户id' })
  @IsNotEmpty({ message: '用户id不可为空' })
  readonly user_id: number;
}
