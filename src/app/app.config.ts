import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import {ToastrModule} from 'ngx-toastr';

import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom([BrowserAnimationsModule, 
    ToastrModule.forRoot({
      "closeButton": true,
      "progressBar": true,
      "positionClass": "toast-bottom-left",
    })])]};

