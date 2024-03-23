import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { SpinnerService } from '../../shared/components/spinner.service';
import { inject } from '@angular/core';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {

  const loaderService = inject(SpinnerService)

  loaderService.setLoading(true)

  return next(req).pipe(
    finalize(() => {
       loaderService.setLoading(false)
    })
  );

};
