import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const notifier = require('node-notifier');

async function bootstrap() {

    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const config = app.get(ConfigService);
    app.use(cookieParser());

    const uploadConfigPath = config.get<string>('uploadAbsolutePath');
    const assetsPublicPath = config.get<string>('staticAssetsPath');
    app.useStaticAssets(uploadConfigPath, {
        prefix: assetsPublicPath
    });

    const globalPrefix = config.get<string>('globalPrefix');
    app.setGlobalPrefix(globalPrefix);

    const port = config.get<number>('port');
    const host = config.get<string>('host');
    await app.listen(port, host, async () => {
        const url = await app.getUrl();
        console.log(`server listen in ${url}${globalPrefix}`);
        notifyCompileComplete();
    });
}
bootstrap();

/** 通知编译完成 */
function notifyCompileComplete() {
    notifier.notify(
        {
            title: '图片管理',
            message: 'serve 编译完成'
        },
        function (err) {
            if (err) {
                console.error('图片管理 serve 编译通知失败', err);
            }

        }
    );
}
