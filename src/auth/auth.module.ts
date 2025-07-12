import { LocalStrategy } from './strategies/local.strategy';

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import refeshJwtConfig from 'src/config/refeshJwt.config';
import { RefeshJwtStrategy } from './strategies/refeshJwt.strategy';

@Module({
  imports: [PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refeshJwtConfig)
  ],
  controllers: [AuthController],
  providers: [ LocalStrategy, AuthService, UsersService,JwtStrategy, RefeshJwtStrategy],
})
export class AuthModule {}
