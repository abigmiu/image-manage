import { Global, Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER, WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ClsService } from 'nestjs-cls';
import { Logger } from 'winston';

@Injectable()
export class AppLoggerService {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER)
        private readonly logger: Logger,
        private readonly cls: ClsService
    ){}

    private getClsId() {
        console.log("clsId", this.cls.getId())
        return this.cls.getId();
    }

    info(message: string, payload?: any) {
        this.logger.info(message, {
            requestId: this.getClsId(),
            data: payload
        })
    }

    error(message: string, e?: Error) {
        const logData = {
            msg: message,
            error: e.message,
        }
        this.logger.error("error",{
            data: logData,
            requestId: this.getClsId(),
        },e.stack);
    }

    logRequest(req: Request) {
        const { headers, url,baseUrl, body, query, ip } = req;
        const logData = {
            headers,
            url,
            baseUrl,
            body,
            query,
            ip
        }
        this.logger.info(`start Request`, { 
            data: logData,
            requestId: this.getClsId()
        });
    }
}
