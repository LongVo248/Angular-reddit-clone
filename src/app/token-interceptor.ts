import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { LoginResponse } from './auth/login/login-response.payload';
import { AuthService } from './auth/shared/auth.service';
@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(public authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
              console.error("Error Event");
          } else {
              console.log(`error status : ${error.status} ${error.statusText}`);
              switch (error.status) {
                  case 401:      //login
                      this.router.navigateByUrl("/login");
                      break;
                  case 403:     //forbidden
                      this.router.navigateByUrl("/unauthorized");
                      break;
              }
          }
      } else {
          console.error("some thing else happened");
      }
      return throwError(error);
      })
    )
  }
//   public handleAuthErrors(req: HttpRequest<any>, next: HttpHandler) {
//     if (!this.isTokenRefreshing) {
//         this.isTokenRefreshing = true;
//         this.refreshTokenSubject.next(null);

//         return this.authService.refreshToken().pipe(
//             switchMap((refreshTokenResponse: LoginResponse) => {
//                 this.isTokenRefreshing = false;
//                 this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);
//                 return next.handle(this.addToken(req, refreshTokenResponse.authenticationToken));
//             })
//         )
//     }
// }
public addToken(req: HttpRequest<any>, jwtToken: string) {
  return req.clone({
      headers: req.headers.set('Authorization',
          'Bearer ' + jwtToken)
  });
}
}
