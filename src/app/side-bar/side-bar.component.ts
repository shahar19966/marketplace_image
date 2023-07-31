import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ShoppingCartService } from '../shopping-list-item/shopping-cart.service';
import { ShoppingListItemComponent } from '../shopping-list-item/shopping-list-item.component';
@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    ShoppingListItemComponent,
  ],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  shoppingCartService = inject(ShoppingCartService);
  shoppingSideBar = this.shoppingCartService.showSidebar;
  // shoppingList = this.shoppingCartService.shoppingList;
  totalPrice = this.shoppingCartService.totalPrice;

  onSidebarHide() {
    this.shoppingCartService.openShoppingSideBar();
  }
}
