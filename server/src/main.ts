import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {

    console.log(__dirname);
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const config = app.get(ConfigService);
    app.use(cookieParser());

    const uploadConfigPath = config.get<string>('uploadAbsolutePath');
    app.useStaticAssets(uploadConfigPath, {
        prefix: '/api/static/upload'
    });

    const globalPrefix = config.get<string>('globalPrefix');
    app.setGlobalPrefix(globalPrefix);

    const port = config.get<number>('port');
    const host = config.get<string>('host');
    await app.listen(port, host, async () => {
        const url = await app.getUrl();
        console.log(`server listen in ${url}${globalPrefix}`);
    });
}
bootstrap();
