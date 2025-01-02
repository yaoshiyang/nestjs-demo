import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    let responseMessage = exception.getResponse()?.['message'];
    if (Array.isArray(responseMessage)) {
      responseMessage = responseMessage[0];
    }
    // 设置错误信息
    const message =
      responseMessage ||
      exception.message ||
      `${status >= 500 ? 'Service Error' : 'Client Error'}`;
    const errorResponse = { data: null, message, code: -1 };

    // 设置返回状态码
    response.status(status);
    response.header('Content-Type', 'application/json;charset=utf-8');
    response.send(errorResponse);
  }
}
