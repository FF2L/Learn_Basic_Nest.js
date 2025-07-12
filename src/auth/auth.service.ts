
import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthJwtPayload } from 'src/types/jwtPayload.type';
import { JwtService } from '@nestjs/jwt';
import refeshJwtConfig from 'src/config/refeshJwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService, 
        private jwtService: JwtService, 
        @Inject(refeshJwtConfig.KEY) private refeshJwtConfiguration: ConfigType<typeof refeshJwtConfig>) {
        }

    async xacThucNguoiDung(email: string, pass:string){
        const user = await this.usersService.timTheoEmail(email)
        if(!user)
            throw new NotFoundException('Không tìm thấy người dùng')
        const kiemTraMatKhau = await bcrypt.compare(pass, user.password)
        if(!kiemTraMatKhau)
            throw new UnauthorizedException('Mật khẩu không đúng')
        return {userId: user.id}

    }

    login(userId: number){
        const payload:AuthJwtPayload = {sub: userId}

        return {
            token: this.jwtService.sign(payload),
            refesh: this.jwtService.sign(payload, this.refeshJwtConfiguration)
        }
    }
    refesh(userId: number){
        const payload: AuthJwtPayload = {sub: userId}
        return this.jwtService.sign(payload)
    }
}
