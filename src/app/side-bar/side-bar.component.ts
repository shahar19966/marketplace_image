import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ShoppingCardService } from '../shopping-list-item/shopping-card.service';
import { ShoppingListItemComponent } from '../shopping-list-item/shopping-list-item.component';
@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule,SidebarModule,ButtonModule,ShoppingListItemComponent],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent  {

  shoppingSideBar = this.shoppingCartService.shoppingSideBar;
  shoppingList = this.shoppingCartService.shoppingList;
  totalPrice = this.shoppingCartService.totalPrice;


 constructor(private shoppingCartService: ShoppingCardService) {}

 
  onSidebarHide(){
    this.shoppingCartService.openShoppingSideBar();
  }

}
