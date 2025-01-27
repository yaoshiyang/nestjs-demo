import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { QuestionDto } from 'src/dto/question.dto';
import { QuestionService } from './question.service';
import { AuthingGuard } from 'src/guard/authing/authing.guard';

interface CustomRequest extends Request {
  user?: {
    userId: string;
  };
}

@Controller('question')
@UseGuards(AuthingGuard)
export class QuestionController {
  constructor(private readonly QuestionService: QuestionService) {}
  // 查询考试记录
  @Get('query')
  async query(
    @Query() query: QuestionDto = { currentPage: 1, pageSize: 10 },
    @Req() request: CustomRequest,
  ) {
    const userId = request.user!.userId;
    const [data, total] = await this.QuestionService.findAll(query, userId);
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

  // 根据考试Id查询考试记录明细
  @Get('detail')
  async getDetail(
    @Query('id') id: number,
    @Query('recordIds') recordIds?: string,
  ) {
    return await this.QuestionService.getDetail(id, recordIds);
  }
}
