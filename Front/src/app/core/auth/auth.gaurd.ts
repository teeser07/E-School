import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageService } from '../message.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private router: Router,
    private auth: AuthService,
    private message: MessageService
  ) { }

  canLoad(): Observable<boolean> {
    return this.checkAuth();
  }

  canActivateChild(): Observable<boolean> {
    return this.checkAuth();
  }

  canActivate(): Observable<boolean> {
    return this.checkAuth();
  }

  checkAuth() {
    return this.auth.authenticated.pipe(map(result => {
      if (result) return true;
      else {
        this.message.warning('คุณไม่มีสิทธิ์เข้าถึงเนื้อหา');
        this.auth.signout();
      }
    }));
  }
}
