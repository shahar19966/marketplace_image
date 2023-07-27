import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ShoppingCardService } from './shopping-card.service';
import { ShoppingItem } from 'src/app/interface/shopping-item.interface';

@Component({
  selector: 'app-shopping-list-item',
  standalone: true,
  imports: [CommonModule,ButtonModule],
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.scss']
})
export class ShoppingListItemComponent {
  @Input() shoppingItem: ShoppingItem | undefined;

  constructor(private shoppingCartService: ShoppingCardService) {}

  onDeleteFromCart()
  {
    this.shoppingCartService.removeItemFromCart(this.shoppingItem);

  }
  onPlusClick()
  {
       const image = this.shoppingItem?.image;
       if (image) {
           this.shoppingCartService.addItemToCart(image);
       }
  }
  onMinusClick()
  {
    this.shoppingCartService.decreaseQuantity(this.shoppingItem);
  }


  

}
