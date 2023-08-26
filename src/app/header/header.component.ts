import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ShoppingCartService } from '../shopping-list-item/shopping-cart.service';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ImageService } from '../images/image.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    BadgeModule,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  
  shoppingCartService = inject(ShoppingCartService);
  imageService = inject(ImageService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  totalQuantity = this.shoppingCartService.totalQuantity;
  onCartClick() {
    this.shoppingCartService.openShoppingSideBar();
  }
  onAddNewImage() {
    this.router.navigate(['new-item'], { relativeTo: this.route });
  }
  onSearch(value: string) {
    this.imageService.searchTerm.set(value);
  }
}
