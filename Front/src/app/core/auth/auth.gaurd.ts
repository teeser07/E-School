import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  canLoad() {
    return this.checkAuth();
  }

  canActivateChild() {
    return this.checkAuth();
  }

  canActivate() {
    return this.checkAuth();
  }

  checkAuth() {
    if (this.auth.authenticated) {
      return true;
    } else {
      this.router.navigateByUrl('/account/signin');
    }
  }
}
