// import { Injectable, inject } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import {
//   AbstractControl,
//   AsyncValidator,
//   ValidationErrors,
// } from '@angular/forms';
// import { Observable, of } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';

// @Injectable({ providedIn: 'root' })
// export class ImageUrlValidator implements AsyncValidator {
//   http = inject(HttpClient);

// validate(ctrl: AbstractControl): Observable<ValidationErrors | null> {

//     return this.http.get(ctrl.value, { observe: 'response' })
//       .pipe(
//         map(res => {
//           if (res.status === 200) {
//             return null;
//           } else {
//             return { invalidUrl: true };
//           }
//         }),
//         catchError(error => {
//           console.error('error: ', error);
//           return of({ invalidUrl: true });
//         })
//       );
//   }

//ask tomer !

import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImageUrlValidator implements AsyncValidator {
  //if the url vaild return null(V) else return true(X)
  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.testImageUrl(ctrl.value);
  }

  //test img loaoding
  private testImageUrl(url: string): Observable<ValidationErrors | null> {
    return new Observable((observer) => {
      const img = new Image();
      img.src = url;

      //check if the image loads without any error,
      img.onload = () => {
        observer.next(null);
        observer.complete();
      };

      //if the URL is not a valid
      img.onerror = () => {
        observer.next({ invalidUrl: true });
        observer.complete();
      };
    });
  }
}
