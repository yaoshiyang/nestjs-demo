import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ExamResultdDto } from '../../dto/exam-result.dto';
import { ExamResultService } from './exam-result.service';
import { AuthingGuard } from 'src/guard/authing/authing.guard';
@Controller('result')
@UseGuards(AuthingGuard)
export class ExamResultController {
  constructor(private readonly examResultService: ExamResultService) {}

  // 首页 - 最近考试记录（默认最多10条）
  @Get('recent')
  async getRecentRecord() {
    const query = { dataTime: new Date(), currentPage: 1, pageSize: 10 };
    const data = await this.examResultService.findAll(query as ExamResultdDto);
    return data[0];
  }

  @Get('total')
  async getTotal() {
    return await this.examResultService.getTotal();
  }

  // 根据考试Id查询考试记录明细
  @Get('detail')
  async getDetail(@Query('examId') examId: number) {
    return await this.examResultService.getDetail(examId);
  }

  // 根据考试Id查询考试记录明细 + 关联回答的问题 + 本次考试结果
  @Get('full')
  async getFullDetail(@Query('examId') examId: number) {
    return await this.examResultService.getFullDetail(examId);
  }

  // 查询考试记录
  @Get('query')
  async query(
    @Query() query: ExamResultdDto = { currentPage: 1, pageSize: 10 },
  ) {
    const [data, total] = await this.examResultService.findAll(query);
    return {
      data,
      page: {
        currentPage: query.currentPage,
        pageSize: query.pageSize,
        total,
        totalPage: Math.ceil(total / query.pageSize),
      },
    };
  }
}
