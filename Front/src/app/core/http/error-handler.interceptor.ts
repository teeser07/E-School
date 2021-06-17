import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from '../message.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoaderService } from '../loader/loader.service';

export interface ErrorModel {
  code: string,
  parameters: string[]
}

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private message: MessageService,
    private loader: LoaderService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const reg = new RegExp(environment.apiUrl);
    if (reg.test(req.url)) {
      return next.handle(req).pipe(catchError(error => this.errorHandler(error)));
    } else {
      return next.handle(req);
    }
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpErrorResponse): Observable<HttpEvent<any>> {

    // if (!environment.production) {
    // Do something with the error
    // }

    this.loader.forceStop();
    if (response.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.message.error(response.error.message);
    }
    else {
      this.handleBackendError(response);
    }

    return of();
  }

  private handleBackendError(error: HttpErrorResponse) {
    switch (error.status) {
      case 0:
        this.message.error(`ไม่มีการตอบรับจาก url : ${error.url} กรุณาตรวจสอบการเชื่อมต่อ`);
        break;
      case 403:
        this.message.warning(`คุณไม่มีสิทธิ์เข้าถึง url : ${error.url}`);
        break;
      case 401:
        this.message.warning(`คุณไม่มีสิทธิ์เข้าถึงเนื้อหา`);
        break;
      case 500:
        /* environment.production ? this.message.error('พบข้อผิดพลาดกรุณาติดต่อผู้ดูแลระบบ') : */
        this.message.error(error.error.errors.code);
        break;
      case 400:
      case 404:
        const backendError = error.error;
        if (backendError == null && error.status == 404) {
          this.message.error(`ไม่พบ url : ${error.url}`);
        }
        else if (backendError.message) {
          this.message.error(backendError.message);
        }
        else this.message.error(backendError);
        break;
    }
  }
}
