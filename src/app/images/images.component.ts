import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageItemComponent } from './image-item/image-item.component';
import { ImageService } from './image.service';
import { LoaderComponent } from '../loader/loader.component';
import { LoadingService } from '../loader/loading.service';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [CommonModule, ImageItemComponent, LoaderComponent],
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
})
export class ImagesComponent {
  imageService = inject(ImageService);
  loadingService = inject(LoadingService);
  images = this.imageService.filteredImages;
}
