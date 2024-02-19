import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  //Interceptor para el Token y colocarlo en el header del Authorization
  const tokenService = inject(TokenService);
  const router = inject(Router);

  tokenService.isAuthenticacion.subscribe({
    next: (value) => {
      if (value) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${tokenService.getToken()}`,
          },
        });
      }
    },
  });

  return next(req).pipe(
    catchError((e: HttpErrorResponse) => {
      if (e.status === 401) {
        tokenService.removeToken();
        router.navigate(['']);
        console.log('error 401');
      }

      const error = e.error?.message || e.statusText;
      console.log(error);
      return throwError(() => error);
    })
  );
};
