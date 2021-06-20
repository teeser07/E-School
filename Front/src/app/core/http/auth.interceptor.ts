import { Injectable, Injector } from '@angular/core';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, first, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
    private authService: AuthService;

    constructor(private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService === undefined) this.authService = this.injector.get(AuthService);
        let user = this.authService.user;
        let reqToForward = req.clone({ setHeaders: { authorization: 'Bearer ' + user.token } });
        return next.handle(reqToForward).pipe(catchError((err: HttpErrorResponse) => {
            if (err.status == 401) this.authService.signout();
            return throwError(err);
        }));
    }
}