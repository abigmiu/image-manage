import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import type { Response } from 'express';

import { Catch, HttpException } from '@nestjs/common';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor() { }

    catch(exception: HttpException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const status = exception.getStatus();
        const message = exception.message;

        const ret = ({
            code: status,
            result: null,
            message: message,
        });

        response.status(200).json(ret);
    }
}
