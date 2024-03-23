import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { spinnerInterceptor } from './core/interceptors/spinner.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(ToastrModule.forRoot()),
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideHttpClient(withInterceptors([spinnerInterceptor])),

  ],
};
