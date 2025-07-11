
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}
    async xacThucNguoiDung(email: string, pass:string){
        const user = await this.usersService.timTheoEmail(email)
        if(!user)
            throw new NotFoundException('Không tìm thấy người dùng')
        const kiemTraMatKhau = await bcrypt.compare(pass, user.password)
        if(!kiemTraMatKhau)
            throw new UnauthorizedException('Mật khẩu không đúng')
        return {userId: user.id}

    }
}
