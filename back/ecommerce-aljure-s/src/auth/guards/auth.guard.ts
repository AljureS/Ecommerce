import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
// import { request } from 'http';
import { Observable } from 'rxjs';
import { Role } from 'src/users/roles.enum';

function validate (req: Request){
  if (!req.headers.authorization) {
    return false 
  }
  const authHeader = req.headers.authorization
  //* Basic: email:password
  const auth = authHeader.split(' ')[1]
  //* email:password
  if (!auth) {
    return false 
  }

  const [email, password] = auth.split(':')
  if (!email || !password) {
    return false
  }
  return true
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const token = req.headers.authorization?.split(' ')[1]; // para separar el bearer del token
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    const secret = process.env.JWT_SECRET;
    const user = this.jwtService.verify(token, { secret });

    if (!user) {
      throw new UnauthorizedException('Error in validation token');
    }

    user.exp = new Date(user.exp * 1000);

    user.roles = user.isAdmin ? [Role.Admin] : [Role.User];

    req.user = user;
    
    return true
  }
}
