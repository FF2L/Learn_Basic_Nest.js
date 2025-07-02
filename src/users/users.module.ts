import { Module, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // đăng ký User entity với TypeOrmModule để sử dụng repository trong service
  controllers: [UsersController], // đăng ký controller để xử lý các request đến /users
  providers: [
    UsersService, // đăng ký service để xử lý logic liên quan đến người dùng
    { //sử dụng trong users module
      provide: APP_PIPE, // cung cấp ValidationPipe toàn cục cho user
      useValue: new ValidationPipe({
        whitelist: true, //loại bỏ các trường không có trong DTO
        forbidNonWhitelisted: true, //  trả về lỗi nếu có trường không có trong DTO
        transform: true, // tự động chuyển đổi kiểu dữ liệu
        transformOptions:{
          enableImplicitConversion: true // chuyển đổi ngầm định kiểu dữ liệu, ví dụ: string sang number
        }
      })
    }
  ],
})
export class UsersModule {}
