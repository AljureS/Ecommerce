import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalMiddleware } from './middlewares/global';
import * as morgan from 'morgan';
import {config as dotenvConfig} from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
dotenvConfig({path: '.development.env'});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .setDescription('The Ecommerce API description M4 Backend ')
    .setVersion('1.0')
    .addBearerAuth()// para loggerse en la documentación
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/doc/ecommerce', app, document);

  app.use(GlobalMiddleware)
  app.use(morgan('dev'));
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    transform: true, 
  }))
  await app.listen(process.env.SERVER_PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
  
}
bootstrap();
