// response transfrom
import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import type { Request, Response } from 'express';
import type { Observable } from 'rxjs';

import { HttpStatus, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';




@Injectable()
export class TransformInterceptor implements NestInterceptor {
    constructor() { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>();

        if (request.method.toUpperCase() === 'POST' && response.statusCode === HttpStatus.CREATED) {
            response.status(HttpStatus.OK);
        }
        if (request.method.toUpperCase() === 'GET' && response.statusCode === HttpStatus.NOT_MODIFIED) {
            response.status(HttpStatus.OK);
        }

        return next.handle().pipe(
            map((data) => {
                const ret = {
                    code: HttpStatus.OK,
                    data: data || null,
                    msg: 'ok',
                };


                return ret;
            }),
        );
    }
}
