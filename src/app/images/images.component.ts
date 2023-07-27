import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageItemComponent } from './image-item/image-item.component';
import { ImageSrvice } from './image.service';


@Component({
  selector: 'app-images',
  standalone: true,
  imports: [CommonModule,ImageItemComponent],
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent {
  imagesList=this.imageService.filteredImages;
 
  constructor(private imageService: ImageSrvice ) {
}

  
}
