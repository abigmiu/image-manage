import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from 'src/interceptors/transfrom.interceptor';
import { appModules } from 'src/modules';
import { TypeOrmModule } from '@nestjs/typeorm';

import {  join } from 'path';
import { HttpExceptionFilter } from 'src/filters/httpException.filter';
import { GlobalExceptionFilter } from 'src/filters/globalException.filter';

@Module({
    imports: [
        ...appModules,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: '123456',
            charset: 'utf8mb4',
            database: 'image_manage',
            entities: [join(__dirname, '../entities/**/*.entity{.js,.ts}')],
            synchronize: true,
            logging: false,
        })
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: TransformInterceptor
        },
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter,
        },
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule {}
