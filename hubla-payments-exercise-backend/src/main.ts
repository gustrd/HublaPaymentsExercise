import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configService } from './config/config.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Validation pipes configuration, used by DTOs
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));
  
  //Swagger configuration, default url /docs
  if (!configService.isProduction()) 
  {
    const document = SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle('Hubla - Transaction API')
      .setDescription('API to view and modify the sales transactions, used at the reports.')
      .build());

    SwaggerModule.setup('docs', app, document);
  }

  //CORS configuration
  app.enableCors(
    {
      "origin": ["http://localhost:3000","http://localhost:3001","http://nodejs-hubla-frontend:3001","http://127.0.0.1:3001"],
      "methods": ["GET,HEAD,PUT,PATCH,POST,DELETE"],
      "credentials": true,
      "optionsSuccessStatus": 204,
      "allowedHeaders": ["Content-Type", "Authorization"]
    }
  );

  await app.listen(3000);
}
bootstrap();
