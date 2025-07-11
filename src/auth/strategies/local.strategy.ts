import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor (private authService: AuthService) {
        super({
            usernameField: 'email', // Cấu hình để sử dụng email thay vì username
            passwordField: 'password'
        });
    }

    async validate(email: string, password: string){ // Thêm async
        return await this.authService.xacThucNguoiDung(email, password);       
    }
}