import { Module, Global } from '@nestjs/common';
import { AuthingService } from './authing.service';
import { AuthingController } from './authing.controller';
import { ConfigModule } from '@nestjs/config';
import envConfig from '../../../env.config';

@Global()
@Module({
  providers: [AuthingService],
  exports: [AuthingService],
  controllers: [AuthingController],
})
export class AuthingModule {}
