import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageSrvice } from '../image.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [CommonModule,InputTextModule,ButtonModule ,FormsModule,ReactiveFormsModule ],
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent {
  form!: FormGroup;
  hasUnsavedChanges = false;

  constructor(private formBuilder: FormBuilder,
    private imageService:ImageSrvice,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      imageURL: ['', Validators.required],
      price: ['', Validators.required]
    });

    this.form.valueChanges.subscribe(() => {
      this.hasUnsavedChanges = this.form.dirty;
    });
  }

  onSubmit() {
    this.hasUnsavedChanges = false;
    const { title, artist, imageURL, price } = this.form.value;
    this.imageService.addNewImage(title,imageURL,artist,price);
    this.toastr.success("Image added successfully");
    this.router.navigate(['images-list'],{relativeTo: this.route});

  }

}
