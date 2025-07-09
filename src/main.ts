import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { log } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //set gobal validiation pipe áp dụn t cho toàn bộ ứng dụng
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true, // loại bỏ các trường ko có trong dto
  //     forbidNonWhitelisted: true // trả về lỗi nếu có trường ko có trong dto
  //   })
  // );
  console.log(process.env.URLA);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
