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
      .setTitle('Transaction API')
      .setDescription('API to view and modify the sell transactions, used at the reports.')
      .build());

    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(3000);
}
bootstrap();
