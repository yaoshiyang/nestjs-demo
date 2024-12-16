import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import envConfig from '../env.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseInfoModule } from './module/base-info/base-info.module';
import { ExamResultModule } from './module/exam-result/exam-result.module';
import { ExamModule } from './module/exam/exam.module';
import { QuestionModule } from './module/question/question.module';

@Module({
  imports: [
    BaseInfoModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [envConfig.path] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        autoLoadEntities: true,
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306), // 端口号
        username: configService.get('DB_USER', 'root'), // 用户名
        password: configService.get('DB_PASSWORD', 'root'), // 密码
        database: configService.get('DB_DATABASE', 'interview'), //数据库名
        timezone: '+08:00', //服务器上配置的时区
        extra: {
          connectionInitSqls: [
            "SET SESSION sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));",
          ],
        },
      }),
    }),
    ExamResultModule,
    ExamModule,
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
