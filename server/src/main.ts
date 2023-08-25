import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    console.log(__dirname);
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(cookieParser());
    app.useStaticAssets(join(__dirname, '../upload'), {
        prefix: '/api/static/upload'
    });
    app.setGlobalPrefix('/api');

    await app.listen(3000);
}
bootstrap();
