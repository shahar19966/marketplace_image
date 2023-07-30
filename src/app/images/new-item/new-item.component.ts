import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ImageSrvice } from '../image.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Image } from '../../interfaces/image.interface';
import { ImageUrlValidator } from './imageURL.validator';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    TooltipModule,
  ],
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent {
  //inject
  formBuilder = inject(NonNullableFormBuilder);
  imageUrlValidator = inject(ImageUrlValidator);
  imageService = inject(ImageSrvice);
  toastr = inject(ToastrService);
  router = inject(Router);

  hasUnsavedChanges = false;

  form = this.formBuilder.group({
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    artist: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
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
    price: [0, [Validators.required, Validators.min(11), Validators.max(1000)]],
    category: [''],
  });

  ngOnInit() {
    this.form.valueChanges.subscribe(() => {
      this.hasUnsavedChanges = this.form.dirty;
    });
  }

  onSubmit() {
    this.hasUnsavedChanges = false;
    const image: Image = this.form.getRawValue();
    this.imageService.addNewImage(image);
    this.toastr.success('Image added successfully');
    this.router.navigateByUrl('/');
  }
}
