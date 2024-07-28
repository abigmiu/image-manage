import { Injectable, NestMiddleware } from '@nestjs/common';
import { AppLoggerService } from 'src/modules/common/app-logger/app-logger.service';
import { Request } from 'express';

@Injectable()
export class AppRequestMiddleware implements NestMiddleware {
  constructor(
    private readonly appLoggerService: AppLoggerService,
  ) {}

  use(req: Request, res: any, next: () => void) {
    
    this.appLoggerService.logRequest(req);
    next();
  }
}
