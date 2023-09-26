import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TransformInterceptor } from 'src/interceptors/transfrom.interceptor';
import { appModules } from 'src/modules';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import config from 'src/config';

import { HttpExceptionFilter } from 'src/filters/httpException.filter';
import { GlobalExceptionFilter } from 'src/filters/globalException.filter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppValidationPipe } from 'src/pipe/validate.pipe';
import { AppAuthGuard } from '@/guards/auth.guard';

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
        {
            provide: APP_PIPE,
            useClass: AppValidationPipe
        },
        {
            provide: APP_GUARD,
            useClass: AppAuthGuard
        }
    ],
})
export class AppModule {}
