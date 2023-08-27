import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from 'src/interceptors/transfrom.interceptor';
import { appModules } from 'src/modules';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import config from 'src/config';

import {  join } from 'path';
import { HttpExceptionFilter } from 'src/filters/httpException.filter';
import { GlobalExceptionFilter } from 'src/filters/globalException.filter';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ...appModules,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService) {
                return configService.get<TypeOrmModuleOptions>('db');
            }
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
