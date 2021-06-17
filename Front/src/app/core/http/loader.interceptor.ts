import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoaderService } from 'src/app/loader/loader.service';
/**
 * Block UI when requesting`.
 */
@Injectable({
    providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {
    constructor(public ls: LoaderService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.ls.start();
        return next.handle(request).pipe(
            finalize(() => this.ls.stop())
        );
    }
}