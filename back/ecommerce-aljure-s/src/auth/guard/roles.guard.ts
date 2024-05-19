import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  // el reflectro trae la metadata
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    //Extraigo los roles 
    const requiredRoles = 
      this.reflector.getAllAndOverride<string[]>('roles', [
        context.getHandler(),//del controlador que lo llama 
        context.getClass(), // de la clase 
      ])
    
    const request = context.switchToHttp().getRequest();
    const user = request.user // aca esta el rol 

    //Checkea si el usuario tiene el rol
    const hasRole = () =>
      requiredRoles.some((role) => user.roles?.includes(role));
    //Que exista el susuario, que tenga algun rol y que coincida con el de controller 
    const valid = user && user.roles && hasRole();

    if(!valid) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }

    return true;
  }
}
