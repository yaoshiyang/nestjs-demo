import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthingService } from './authing.service';
import { AuthingController } from './authing.controller';
import { UserEntity } from 'src/entities/user.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthingService],
  exports: [AuthingService],
  controllers: [AuthingController],
})
export class AuthingModule {}
