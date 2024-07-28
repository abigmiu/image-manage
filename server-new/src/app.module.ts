import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { businessModules } from './modules/modules';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { ResponseTransformInterceptor } from './interceptor/response.interceptor';
import { RedisModule } from '@songkeys/nestjs-redis';
import { BusinessHttpException } from './filter/httpException.filter';
import { ClsMiddleware, ClsModule } from 'nestjs-cls';
import { v4 as uuidV4 } from 'uuid';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { RequestValidationPipe } from './pipe/request-validation.pipe';
import { AppLoggerService } from './modules/common/app-logger/app-logger.service';
import * as path from 'path';

import  'winston-daily-rotate-file';
import { AppRequestMiddleware } from './middleware/app-request/app-request.middleware';

@Module({
    imports: [
        RedisModule.forRoot({
            config: {
                host: 'localhost',
                port: 6379,
            }
        }),
        JwtModule.register({
            global: true,
            secret: '123456',
            signOptions: {
                expiresIn: '30d',
            }
        }),
        ClsModule.forRoot({
            global: true,
            middleware: {
                mount: false,
                generateId: true,
                idGenerator: (req: Request) => {
                    return req.headers['X-Request-Id'] ?? uuidV4();
                }
            },
        }),
        WinstonModule.forRoot({
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.ms(),
                        nestWinstonModuleUtilities.format.nestLike('MyApp', {
                            colors: true,
                            prettyPrint: true,
                            processId: true,
                            appName: true,
                        }),
                    )
                }),
                new winston.transports.DailyRotateFile({
                    dirname: 'logs/error',
                    filename: 'error/%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    level: 'error',
                    format: winston.format.combine(
                        winston.format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss',
                        }),
                        winston.format.json(),
                    )
                }),
                new winston.transports.DailyRotateFile({
                    dirname: 'logs',
                    filename: '%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    format: winston.format.combine(
                        winston.format((info) => {
                            if (info.level === 'error') {
                                return false;
                            }
                            return info;
                        })(),
                        winston.format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss',
                        }),
                        winston.format.json(),
                    ),
                    
                })
            ]
        }),
        ...businessModules
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseTransformInterceptor,
        },
        {
            provide: APP_FILTER,
            useFactory(appLoggerService: AppLoggerService) {
                return new BusinessHttpException(appLoggerService);
            },
            inject: [AppLoggerService],
       
        },
        {
            provide: APP_PIPE,
            useClass: RequestValidationPipe
        }
    ],
    exports: []
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ClsMiddleware).forRoutes('*');
        consumer.apply(AppRequestMiddleware).forRoutes('*');
        
    }
}
