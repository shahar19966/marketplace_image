import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Image } from 'src/app/interface/image.interface';
import { ShoppingCardService } from 'src/app/shopping-list-item/shopping-card.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-image-item',
  standalone: true,
  imports: [CommonModule,ButtonModule],
  templateUrl: './image-item.component.html',
  styleUrls: ['./image-item.component.scss']
})
export class ImageItemComponent {
  @Input() image: Image | undefined;

  //ask tomer about that!!!! 
  // private toastr = Inject(ToastrService);
  constructor(private shoppingCartService: ShoppingCardService,
    private toastr: ToastrService,
    )
  {}

  onAddToCart(){
    if (this.image) {
      this.shoppingCartService.addItemToCart(this.image);
      this.toastr.success("Image added successfully");
    } else {
      this.toastr.error('Image is undefined, cannot add to cart.');
    }
  }
}
