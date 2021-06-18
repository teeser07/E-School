import { Injectable, Injector } from '@angular/core';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, first, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
    private authService: AuthService;

    constructor(private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService === undefined) {
            this.authService = this.injector.get(AuthService);
        }

        return next.handle(req).pipe(tap(() => {
            if (!this.authService.authenticated) {
                this.authService.signout();
            }
        }));
    }
}