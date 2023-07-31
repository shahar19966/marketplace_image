import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';

export const imageUrlValidator: AsyncValidatorFn = (ctrl: AbstractControl) => {
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
};
