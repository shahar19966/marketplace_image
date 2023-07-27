import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {  provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import {  provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [

    // app routes
    provideRouter(routes),


    provideAnimations(),

    // ngx-toastr
    provideToastr({
      closeButton: true,
      progressBar: true,
      positionClass: 'toast-bottom-left',
    }),
  ],
};
