import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  tokenService.isAuthenticacion.subscribe({
    next: (value) => {
      if (!value) {
        router.navigate(['']); //Regresa al login
      }
    },
    error: (e) => {
      console.log(e);
      router.navigate(['']); //Regresa al login
    },
  });

  return true;
};
