import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppRequestMiddleware } from './middleware/app-request/app-request.middleware';
import * as cors from 'cors';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors({
    maxAge: 3600, 
  }))
  app.useWebSocketAdapter(new IoAdapter(app))
  app.setGlobalPrefix('api')
  await app.listen(3000);
}
bootstrap();
