import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { QuestionEntity } from 'src/entities/question.entity';
@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) {}
  async getQuestion(id: number) {
    // 获取题目
  }

  async getQuestions(ids: number[]) {
    // 获取题目
    return this.questionRepository.findBy({ id: In(ids) });
  }
}
