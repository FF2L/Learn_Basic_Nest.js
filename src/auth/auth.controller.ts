import { Controller, HttpCode, HttpStatus, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthLocalGuard } from './guard/auth-local/auth-local.guard';
import { RefeshJwtStrategy } from './strategies/refeshJwt.strategy';
import { AuthRefeshjwtGuard } from './guard/auth-refeshjwt/auth-refeshjwt.guard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthLocalGuard)//Sử dụng local strategy để xác thực người dùng
  @Post('login')
  async login(@Request() req){
    const token = this.authService.login(req.user.userId)
    return {token};
  }

  @UseGuards(AuthRefeshjwtGuard)
  @Post('refesh')
  refesh(@Req() req){
    console.log(req.user)
    return {token: this.authService.refesh(req.user.userId) }
  }

}
