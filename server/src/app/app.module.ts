import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from 'src/interceptors/transfrom.interceptor';
import { appModules } from 'src/modules';
import { TypeOrmModule } from '@nestjs/typeorm'

import {  join } from 'path';

@Module({
    imports: [
        ...appModules,
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
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
        }
    ],
})
export class AppModule {}
