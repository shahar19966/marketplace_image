import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImageUrlValidator implements AsyncValidator {
  //if the url vaild return null else return true
  validate(ctrl: AbstractControl) {
    const imageUrl = ctrl.value;
    return new Observable<ValidationErrors | null>((observer) => {
      const img = new Image();
      img.src = imageUrl;

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
