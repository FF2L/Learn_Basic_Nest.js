
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthJwtPayload } from 'src/types/jwtPayload.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

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
        return this.jwtService.sign(payload)
    }
}
