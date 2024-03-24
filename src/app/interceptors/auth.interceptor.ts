import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, pluck, switchMap, throwError } from 'rxjs';
import { AuthService } from '../results/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!request.url.endsWith('oauth2/token')) {
      request = this._addToken(request);
    } else {
      request.headers.delete('authorization');
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(error);
      }),
    );
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    localStorage.removeItem('ACCESS_TOKEN');
    return this._authService.getToken().pipe(
      pluck('access_token'),
      switchMap((token: string) => {
        localStorage.setItem('ACCESS_TOKEN', token);
        return next.handle(this._addToken(request));
      }),
    );
  }

  private _addToken(request: HttpRequest<any>) {
    const token = localStorage.getItem('ACCESS_TOKEN');
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
