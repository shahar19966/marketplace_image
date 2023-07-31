import {
  Component,
  ViewChild,
  ElementRef,
  inject,
  effect,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {
  FormControl,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ImageService } from '../image.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Image } from '../../interfaces/image.interface';
import { TooltipModule } from 'primeng/tooltip';
import { ImageModule } from 'primeng/image';
import { imageUrlValidator } from './imageURL.validator';

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
    ImageModule,
  ],
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent {
  //inject
  formBuilder = inject(NonNullableFormBuilder);
  imageService = inject(ImageService);
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
    imageURL: this.formBuilder.control('', {
      validators: Validators.required,
      asyncValidators: imageUrlValidator,
      updateOn: 'change',
    }),
    price: [0, [Validators.required, Validators.min(11), Validators.max(1000)]],
    category: [''],
  });

  formChanges = toSignal(this.form.valueChanges);
  hasChangesEffect = effect(() => {
    if (this.formChanges()) {
      this.hasUnsavedChanges = this.form.dirty;
    }
  });

  get imageURL() {
    return this.form.controls.imageURL;
  }

  onSubmit() {
    this.hasUnsavedChanges = false;
    const image: Image = this.form.getRawValue();
    this.imageService.addNewImage(image);
    this.toastr.success('Image added successfully');
    this.router.navigateByUrl('/');
  }
}
