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
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from '../../interfaces/image.interface';

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
  ],
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent {
  formBuilder = inject(NonNullableFormBuilder);

  form = this.formBuilder.group({
    title: ['', Validators.required],
    artist: ['', Validators.required],
    imageURL: ['', Validators.required],
    price: [0, Validators.required],
    category: ['', Validators.required],
  });

  hasUnsavedChanges = false;

  constructor(
    private imageService: ImageSrvice,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
