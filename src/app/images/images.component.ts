import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageItemComponent } from './image-item/image-item.component';
import { ImageService } from './image.service';
import { LoaderComponent } from '../loader/loader.component';
import { timer } from 'rxjs';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [CommonModule, ImageItemComponent, LoaderComponent],
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent implements OnInit {
  imageService = inject(ImageService);
  images = this.imageService.filteredImages;
  loading = signal(true);

  ngOnInit() {
    const loadingTime = 1500; //ms
    timer(loadingTime).subscribe((x) => this.loading.set(false));
  }
}
