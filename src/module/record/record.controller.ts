import { Controller, Get, Query } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordDto } from '../../dto/record.dto';
@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get('recent')
  getRecentRecord() {
    const query = { dataTime: new Date(), currentPage: 1, pageSize: 10 };
    const [data] = await this.recordService.findAll(query);
    return data;
  }

  @Get('query')
  async query(@Query() query: RecordDto) {
    const [data, total] = await this.recordService.findAll(query);
    return {
      data,
      page: {
        currentPage: query.currentPage,
        pageSize: query.pageSize,
        total,
      },
    };
  }
}
