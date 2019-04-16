import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerBaseConfig, SwaggerDocument, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  // tslint:disable-next-line:typedef
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const options: SwaggerBaseConfig = new DocumentBuilder()
    .setTitle('Example')
    .setSchemes('http', 'https')
    .setDescription('The Example API')
    .setVersion('1.0')
    .addTag('Example')
    .addBearerAuth()
    .build();

  const document: SwaggerDocument = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);

  await app.listen(process.env.PORT || 8090);
}
bootstrap();
