import { Component, Inject, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Image } from 'src/app/interfaces/image.interface';
import { ShoppingCardService } from 'src/app/shopping-list-item/shopping-card.service';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-image-item',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.scss'],
})
export class ImageItemComponent {
  @Input() image: Image | undefined;

  private toastr = inject(ToastrService);
  private shoppingCartService = inject(ShoppingCardService);
  private imageService = inject(ImageService);

  onAddToCart() {
    if (this.image) {
      this.shoppingCartService.addItemToCart(this.image);
      this.toastr.success('Image added successfully');
    } else {
      this.toastr.error('Image is undefined, cannot add to cart.');
    }
  }
  onDeleteButton() {
    let userResponse = window.confirm(
      'Are you sure you want to delete this Image?'
    );

    if (userResponse && this.image) {
      this.imageService.deleteImage(this.image);
      this.toastr.success('Image delete successfully');
    }
  }
}
