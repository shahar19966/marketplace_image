import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ShoppingCardService } from './shopping-card.service';
import { ShoppingItem } from 'src/app/interfaces/shopping-item.interface';

@Component({
  selector: 'app-shopping-list-item',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.scss'],
})
export class ShoppingListItemComponent {
  @Input() shoppingItem!: ShoppingItem;

  constructor(private shoppingCartService: ShoppingCardService) {}

  onDeleteFromCart() {
    this.shoppingCartService.removeItemFromCart(this.shoppingItem);
  }

  increaseQuantity() {
    const image = this.shoppingItem.image;
    this.shoppingCartService.addImage(image);
  }
  decreaseQuantity() {
    this.shoppingCartService.decreaseQuantityAndCount(this.shoppingItem);
  }
}
