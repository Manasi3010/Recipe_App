import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs';
import { SpinnerService } from './Service/spinner.service';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(private loaderservice: SpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loaderservice.show();
    return next.handle(request).pipe(finalize(() => this.loaderservice.hide()));
  }
}
