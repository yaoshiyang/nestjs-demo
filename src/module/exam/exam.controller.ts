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
import { ExamResultService } from '../exam-result/exam-result.service';
import { SaveExamRecordDto } from 'src/dto/save-exam-record.dto';
import { SaveExamDto } from 'src/dto/save-exam.dto';
import { multerConfig } from 'src/config/multer';
import { AuthingGuard } from 'src/guard/authing/authing.guard';
import { Request } from 'express';

interface CustomRequest extends Request {
  user?: {
    userId: string;
  };
}
@Controller('exam')
@UseGuards(AuthingGuard)
export class ExamController {
  constructor(
    private readonly examService: ExamService,
    private readonly questionService: QuestionService,
    private readonly examResultService: ExamResultService,
  ) {}

  /**
  async createExam(@Query() query: any, @Req() request: CustomRequest) {
   * 1. 取决于算法，需不需要拿到模拟考试ID；
   * @todo: 缺少一张表，user表，去描述当前用户基础信息，vip次数等内容。
   * @param query
   * @returns
   */
  @Get('create')
  async createExam(@Query() query: any, @Req() request: CustomRequest) {
    const userId = request.user!.userId;
    // 创建考试
    const exam = await this.examService.createExam(
      userId,
      query.count,
      query.duration,
    );

    const qestionIds = await this.examService.getQuestionIds();
    const questions = await this.questionService.getQuestions(qestionIds);
    return { examId: exam.id, questions };
  }

  @Get('questions')
  async getQuestions(
    @Query('rangeTime') rangeTime: number = 15,
    @Query('count') count: number = 3,
    @Query('ai') ai: number = 1,
  ) {
    // 获取AI生成题目；
    const ids = await this.examService.getQuestionIds();
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
    const saveResult = (await this.examService.saveExamRecord(payLoad)) as any;
    this.examService.requestSpeechText(userAudio, saveResult.id);
    return saveResult;
  }

  @Post('recordUserAnswerText')
  async recordUserAnswerText(
    @Body() updateRow: { id: number; userAnswer: string },
  ) {
    return await this.examService.saveExamRecord(updateRow);
  }

  // AI润色答案
  @Get('ai')
  async aiAnswer() {}

  // 保存考试；
  @Post('save')
  async saveExam(@Body() payLoad: SaveExamDto, @Req() request: CustomRequest) {
    let { examRecords, ...examData } = payLoad;
    const userId = request.user!.userId;
    if (!examData.id) {
      const exam = await this.examService.createExam(
        userId,
        examData.count,
        examData.duration,
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
    this.examResultService.save(examData.id);
    return { message: '保存成功' };
  }

  // 删除当前考试记录
  @Get('delete')
  async deleteExam(@Query('id') id: number) {
    return await this.examService.deleteExam(id);
  }
}
