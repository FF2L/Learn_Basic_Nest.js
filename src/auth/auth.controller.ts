import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthLocalGuard } from './guard/auth-local/auth-local.guard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthLocalGuard)//Sử dụng local strategy để xác thực người dùng
  @Post('login')
  async login(@Request() req){
    return req.user;
  }
}
