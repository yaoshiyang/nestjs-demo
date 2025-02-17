import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamEntity } from 'src/entities/exam.entity';
import { ExamRecordEntity } from 'src/entities/exam-record.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, interval } from 'rxjs';
import * as fs from 'fs';

// 语音栈
let Speech_Stack: { speechId: string; recordId: string }[] = [];

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(ExamEntity)
    private readonly examRepository: Repository<ExamEntity>,

    @InjectRepository(ExamRecordEntity)
    private readonly examRecordRepository: Repository<ExamRecordEntity>,

    private readonly httpService: HttpService,
  ) {
    // 定时请求语音栈
    setInterval(() => {
      this.getSpeechText();
    }, 1000 * 10);
  }
  /**
   * 获取考试题目
   * @todo  根据算法返回题目Id；/ 先创建考试表？还是直接返回题目？取决与算法需要的条件
   *
   * @param rangeTime 面试时长
   * @param count 题目数量
   * @param ai 是否使用AI
   */
  async getQuestionIds() {
    const questionId_1 = this.getRandom(4, 150);
    const questionId_2 = this.getRandom(151, 280);
    const questionId_3 = this.getRandom(281, 380);
    return [questionId_1, questionId_2, questionId_3];
  }

  async createExam(userId: string, count: number, duration: number) {
    const exam = this.examRepository.create({
      userId,
      status: 0,
      count,
      duration,
      startDate: new Date(),
    });
    return await this.examRepository.save(exam);
  }
  /**
   * 创建保存考试表
   * @param ids
   */
  async updateExam(payLoad: ExamEntity) {
    const { id } = payLoad;
    await this.examRepository.update(id, payLoad);
    return this.examRepository.findOneBy({ id });
  }

  async createExamRecord(examId: number, questionId: number) {
    const examRecord = this.examRecordRepository.create({
      examId,
      questionId,
    });
    return await this.examRecordRepository.save(examRecord);
  }

  async saveExamRecord(payLoad: ExamRecordEntity | any) {
    const { id } = payLoad;
    if (!id) {
      const examRecord = this.examRecordRepository.create(payLoad);
      return await this.examRecordRepository.save(examRecord);
    } else {
      await this.examRecordRepository.update(id, payLoad);
      return this.examRecordRepository.findOneBy({ id });
    }
  }

  async saveAudio(userAudio: Express.Multer.File) {
    return userAudio.path;
  }

  async requestSpeechText(userAudio: Express.Multer.File, recordId: string) {
    const formData = new FormData();
    fs.readFile(userAudio.path, async (err, data) => {
      if (err) return;
      formData.append(
        'audio_file',
        new Blob([data], { type: userAudio.mimetype }),
      );
      const result = await lastValueFrom(
        this.httpService.post(
          'http://123.207.219.30:8000/speech-to-text/',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        ),
      );
      Speech_Stack.push({ speechId: result.data.order_id, recordId });
    });
  }

  async deleteExam(id: number) {
    await this.examRepository.delete(id);
    await this.examRecordRepository.delete({ examId: id });
  }

  private async getSpeechText() {
    if (Speech_Stack.length === 0) return;
    for (const item of Speech_Stack) {
      const result = await lastValueFrom(
        this.httpService.get(
          `http://123.207.219.30:8000/speech-to-text/${item.speechId}`,
        ),
      );
      if (result.data.error_msg) return;
      console.log(`获取[${item.speechId}]上传语音文件的中文翻译`, result.data);
      this.saveExamRecord({ id: item.recordId, userAnswer: result.data.text });
      Speech_Stack = Speech_Stack.filter((i) => i.recordId !== item.recordId);
    }
  }

  private getRandom(min: number, max: number) {
    const floatRandom = Math.random(); // 生成 0 (包含) 到 1 (不包含) 之间的随机浮点数 [4][5]
    const difference = max - min; // 计算最大值和最小值之间的差值 [1]
    const random = Math.round(difference * floatRandom); // 生成 0 到差值之间的随机数，并四舍五入取整 [1]
    const randomWithinRange = random + min; // 将随机数加上最小值，得到指定范围内的随机数 [1]
    return randomWithinRange; // 返回结果 [1]
  }
}
