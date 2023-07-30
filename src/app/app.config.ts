import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideLottieOptions } from 'ngx-lottie';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // app routes
    provideRouter(routes),

    provideAnimations(),
    //provide http Client
    provideHttpClient(withFetch(), withInterceptorsFromDi()),

    //ngx-lottie
    provideLottieOptions({
      player: () => import(/* webpackChunkName: 'lottie-web' */ 'lottie-web'),
    }),

    // ngx-toastr
    provideToastr({
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-bottom-left',
    }),
  ],
};
