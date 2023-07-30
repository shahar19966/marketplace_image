import { Injectable, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ImageUrlValidator } from './imageURL.validator';

@Injectable({
  providedIn: 'root',
})
export class NewItemService {
  formBuilder = inject(NonNullableFormBuilder);
  imageUrlValidator = inject(ImageUrlValidator);

  //get form builder to new item
  getForm() {
    return this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      artist: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      imageURL: [
        '',
        {
          validators: [Validators.required],
          asyncValidators: [
            this.imageUrlValidator.validate.bind(this.imageUrlValidator),
          ],
          updateOn: 'blur',
        },
      ],
      price: [
        0,
        [Validators.required, Validators.min(11), Validators.max(1000)],
      ],
      category: ['', Validators.required],
    });
  }
}
