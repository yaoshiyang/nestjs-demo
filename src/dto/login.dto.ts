import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: '手机号' })
  @IsNotEmpty({ message: '手机号不可为空' })
  phone: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码不可为空' })
  password: string;
}
