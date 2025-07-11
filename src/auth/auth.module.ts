import { LocalStrategy } from './strategies/local.strategy';

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
    PassportModule
],
  controllers: [AuthController],
  providers: [AuthService,UsersService,LocalStrategy],
})
export class AuthModule {}
