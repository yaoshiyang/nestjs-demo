import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { lastValueFrom, catchError } from 'rxjs';
import { ExamEntity } from 'src/entities/exam.entity';
import { ExamResultEntity } from '../../entities/exam-result.entity';
import { ExamResultdDto } from '../../dto/exam-result.dto';
import { debug } from 'console';

type DeepPartial<T> =
  | T
  | (T extends Array<infer U>
      ? DeepPartial<U>[]
      : T extends Map<infer K, infer V>
        ? Map<DeepPartial<K>, DeepPartial<V>>
        : T extends Set<infer M>
          ? Set<DeepPartial<M>>
          : T extends object
            ? {
                [K in keyof T]?: DeepPartial<T[K]>;
              }
            : T);

@Injectable()
export class ExamResultService {
  constructor(
    @InjectRepository(ExamEntity)
    private readonly examRepository: Repository<ExamEntity>,

    @InjectRepository(ExamResultEntity)
    private readonly examResultRepository: Repository<ExamResultEntity>,

    private readonly httpService: HttpService,
  ) {}

  async findAll(
    query: ExamResultdDto,
    userId: string,
  ): Promise<[ExamEntity[], number]> {
    const currentPage = (query.currentPage - 1) * query.pageSize;
    const queryBuilder = this.examRepository.createQueryBuilder('exam');
    queryBuilder
      .leftJoinAndSelect('exam.examReuslt', 'examReuslt')
      .where('exam.userId = :userId', { userId })
      .andWhere('exam.status = 1');
    if (query.startDate) {
      queryBuilder.andWhere('exam.startDate >= :startDate', {
        startDate: query.startDate,
      });
    }
    if (query.endDate) {
      queryBuilder.andWhere('exam.endDate <= :endDate', {
        endDate: query.endDate,
      });
    }
    const data = await queryBuilder
      .skip(currentPage)
      .take(query.pageSize)
      .getManyAndCount();
    return [data[0], data[1]];
  }

  async getTotal(userId: string) {
    const total = await this.examRepository.find({
      where: { userId, status: 1 },
      relations: ['examReuslt'],
    });
    let result = { count: 0, averageScore: 0, totalTime: 0, maxScore: 0 };
    for (const item of total) {
      result.count++;
      result.averageScore += item.examReuslt?.score ?? 0;
      result.totalTime += item.duration;
      result.maxScore = Math.max(result.maxScore, item.examReuslt?.score ?? 0);
    }
    result.totalTime = Math.floor(result.totalTime / 60);
    result.averageScore = result.averageScore / result.count;
    return result;
  }

  async getDetail(examId: number) {
    return await this.examResultRepository.findOne({ where: { examId } });
  }

  /**
   * 获取考试结果 + 回答的问题；用于考试结果详情页
   * @param examId
   */
  async getFullDetail(examId: number) {
    const exam = await this.examRepository.findOne({
      where: { id: examId, status: 1 },
      relations: ['examRecords', 'examReuslt', 'examRecords.question'],
    });
    return exam;
  }

  async save(examId: number) {
    const result: any = await lastValueFrom(
      this.httpService
        .post(
          'http://123.207.219.30/v1/chat-messages',
          {
            inputs: {},
            query:
              '如果有学生在课堂上故意刁难，你该如何应对. \n 回答：考官您好。对于这个问题，我的思路是先稳定局面，再深入沟通解决。\n\n首先，作为一名教师，面对这样故意刁难的学生，我不会正面回击或者着急。因为着急可能会让情况变得更糟，正面回击也不符合教师的职业素养。我会先冷处理一段时间，继续进行正常的教学内容，这样可以避免影响到其他同学的学习进度，也不会让课堂秩序变得混乱。\n\n其次，课后我会找这个学生谈话。我可能会告诉他“老师需要你的支持和帮助，就像你也需要别人的支持和帮助一样”，用真诚去打动他。我相信每个学生内心都是渴望被理解和尊重的。在谈话中，我会了解他刁难我的原因，是因为对我个人有意见，还是对知识有不同的见解。如果是对知识有不同见解，这其实是一个很好的教学机会，我们可以深入探讨，这也能体现出教学相长。\n\n在以后的教学中，我会不断提升自己的专业知识，做到对于知识上的问题不轻易被难住。就像苏霍姆林斯基说的：“教师进行劳动和创造的时间好比一条大河，要靠许多小的溪流来滋养它。教师时常要读书，平时积累的知识越多，上课就越轻松。”我也会在日常教学中逐步树立自己的威信，以更积极的态度去对待每一位学生，用耐心、爱心和责任心去教育他们，努力营造一个民主平等的教学环境，让学生感受到尊重和平等，从而避免类似的事情再次发生。',
            response_mode: 'blocking',
            conversation_id: '',
            user: 'abc-123',
            files: [],
          },
          {
            headers: {
              Authorization: 'Bearer app-KfUSvX6tb7RqrtO1o7JoSpyN',
            },
          },
        )
        .pipe(
          catchError((error) => {
            debugger;
            console.log(error);
            return error;
          }),
        ),
    );

    console.log('exam-result.service', result.data);
    const { answer } = result.data;

    // 解析总评分
    const ratingRegex = /(\d+)分/;
    const ratingMatch = answer.match(ratingRegex);
    const score = ratingMatch ? ratingMatch[1] : '0';

    // 解析优点，并整理成数组
    const advantageRegex = /\*\*优点\*\*：(.*)\n/;
    const advantageMatch = answer.match(advantageRegex);
    const advantages = advantageMatch ? advantageMatch[1].split('。') : [];

    // 解析缺点，并整理成数组
    const disadvantageRegex = /\*\*缺点\*\*：(.*)/;
    const disadvantageMatch = answer.match(disadvantageRegex);
    const disadvantages = disadvantageMatch
      ? disadvantageMatch[1].split('。')
      : [];

    // 能力评估
    const ability = {
      courseDesign: 80,
      teachInnovation: 70,
      teachSkills: 60,
      knowledge: 50,
      communication: 90,
      management: 90,
    };
    const row: DeepPartial<ExamResultEntity> = {
      examId,
      score: +score,
      advantages: JSON.stringify(advantages.filter((v: any) => v)),
      disadvantages: JSON.stringify(disadvantages.filter((v: any) => v)),
      ability: JSON.stringify(ability),
    };
    const examResult = this.examResultRepository.create(row);
    return await this.examResultRepository.save(examResult);
  }
}
