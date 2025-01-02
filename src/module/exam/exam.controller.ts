import {
  Controller,
  Query,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExamService } from './exam.service';
import { QuestionService } from '../question/question.service';
import { SaveExamRecordDto } from 'src/dto/save-exam-record.dto';
import { SaveExamDto } from 'src/dto/save-exam.dto';
import { multerConfig } from 'src/config/multer';
import { AuthingGuard } from 'src/guard/authing/authing.guard';
import { Request } from 'express';

interface CustomRequest extends Request {
  user?: {
    userId: number;
  };
}
@Controller('exam')
@UseGuards(AuthingGuard)
export class ExamController {
  constructor(
    private readonly examService: ExamService,
    private readonly questionService: QuestionService,
  ) {}

  /**
  async createExam(@Query() query: any, @Req() request: CustomRequest) {
   * 1. 取决于算法，需不需要拿到模拟考试ID；
   * @param query
   * @returns
   */
  @Get('create')
  async createExam(@Query() query: any, @Req() request: CustomRequest) {
    const userId = request.user!.userId;
    // 创建考试
    const exam = await this.examService.createExam(
      query.category,
      query.grade,
      query.location,
    );
    const qestionIds = await this.examService.getQuestionIds(15, 3, 1);
    const questions = await this.questionService.getQuestions(qestionIds);
    // qestionIds.forEach((qId) => {
    //   this.examService.createExamRecord(exam.id, qId);
    // });
    return { examId: exam.id, questions };
  }

  @Get('questions')
  async getQuestions(
    @Query('rangeTime') rangeTime: number = 15,
    @Query('count') count: number = 3,
    @Query('ai') ai: number = 1,
  ) {
    // 获取AI生成题目；
    const ids = await this.examService.getQuestionIds(rangeTime, count, ai);
    const questions = await this.questionService.getQuestions(ids);
    return questions;
  }

  // 记录每一题的结果（完成回答调用）
  /**
   * 记录每一题的结果
   * @todo 需要增加一个事务
   * @param */
  @Post('record')
  @UseInterceptors(FileInterceptor('userAudio', multerConfig))
  async recordQuestion(
    @UploadedFile() userAudio: Express.Multer.File,
    @Body() RecordDto: SaveExamRecordDto,
  ) {
    // 保存语音流
    const userAudioUrl = await this.examService.saveAudio(userAudio);
    const payLoad = { ...RecordDto, userAudioUrl };
    return await this.examService.saveExamRecord(payLoad);
  }

  // AI润色答案
  @Get('ai')
  async aiAnswer() {}

  // 保存考试；
  @Post('save')
  async saveExam(@Body() payLoad: SaveExamDto) {
    let { examRecords, ...examData } = payLoad;
    const userId = 1;
    if (!examData.id) {
      const exam = await this.examService.createExam(
        examData.category,
        examData.grade,
        examData.location,
      );
      examData.id = exam.id;
    }
    if (examRecords && examRecords.length > 0)
      examRecords.forEach((record) =>
        this.recordQuestion(record.userAudio, record),
      );
    this.examService.updateExam({
      ...examData,
      status: 1,
      userId,
      id: examData.id,
    });
  }
}
