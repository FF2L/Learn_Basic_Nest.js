import { CanActivate, ExecutionContext, Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class AuthRefeshjwtGuard extends AuthGuard('refesh-jwt'){
}
