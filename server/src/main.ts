import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
    console.log(__dirname);
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('/api');

    await app.listen(3000);
}
bootstrap();
