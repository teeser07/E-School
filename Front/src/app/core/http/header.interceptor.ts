import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable, combineLatest } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

/**
 * Set user info header when requesting`.
 */
@Injectable({
    providedIn: 'root'
})
export class HeaderInterceptor implements HttpInterceptor {
    private authService: AuthService;
    constructor(private injector: Injector) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService === undefined) this.authService = this.injector.get(AuthService);
        const reg = new RegExp(environment.apiUrl);
        if (reg.test(request.url)) {
            let profile = this.authService.profile;
            let req = request.clone({
                headers: new HttpHeaders({
                    'profileId': profile.profileId.toString(),
                    'email': profile.email,
                    'userName': profile.userName
                })
            });
            return next.handle(req);
        }

        return next.handle(request);
    }
}