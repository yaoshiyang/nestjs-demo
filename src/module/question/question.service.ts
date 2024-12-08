import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestionService {
  async getQuestion(id: number) {
    // 获取题目
  }

  async getQuestions(ids: number[]) {
    // 获取题目
  }
}
