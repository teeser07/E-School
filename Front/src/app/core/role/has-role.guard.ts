import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})

export class HasRoleGuard implements CanActivate {
  constructor(
    private as : AuthService,
    private ms : MessageService,
   ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthorized = this.as.user.role.includes(route.data.role);
    if (!isAuthorized){
      this.ms.error('ไม่สามารถเข้าถึงเนื้อหาได้')
    }
    return isAuthorized
  }
  
}
