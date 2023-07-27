import { Injectable, computed, signal } from '@angular/core';
import { Image } from '../interfaces/image.interface';
import { MOCK_IMAGES } from './images';

@Injectable({
  providedIn: 'root',
})
export class ImageSrvice {
  searchTerm = signal('');
  images = signal(this.getImagesFromLocalStorage());

  filteredImages = computed(() => {
    const term = this.searchTerm();

    if (!term) {
      return this.images();
    }

    return this.images().filter(
      (image) =>
        image.title.toLowerCase().includes(term.toLowerCase()) ||
        image.artist.toLowerCase().includes(term.toLowerCase())
    );
  });

  addNewImage(image: Image) {
    this.images.mutate((values) => values.push(image));
    this.saveImagesToLocalStorage(this.images());
  }

  private getImagesFromLocalStorage(): Image[] {
    // return images from local storage if exists
    const storedImages = localStorage.getItem('images');
    if (storedImages) {
      return JSON.parse(storedImages);
    }

    // if not, return mock images as default value
    return MOCK_IMAGES;
  }

  private saveImagesToLocalStorage(images: Image[]): void {
    localStorage.setItem('images', JSON.stringify(images));
  }
}
