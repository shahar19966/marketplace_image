import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ShoppingCardService } from '../shopping-list-item/shopping-card.service';
import { Router,ActivatedRoute, RouterLink } from '@angular/router';
import { ImageSrvice } from '../images/image.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, InputTextModule, BadgeModule, ButtonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  {
   count = this.shoppingCartService.count;
   
  constructor(private shoppingCartService: ShoppingCardService,
    private imageService:ImageSrvice,
               private router: Router,
               private route: ActivatedRoute,) {}

 
  onCartClick(){
    this.shoppingCartService.openShoppingSideBar();
  }
  onAdddNewImage(){
    this.router.navigate(['new-item'],{relativeTo: this.route});
  }
  onSearch(value: string) {
    this.imageService.searchTerm.set(value); 
  }
}
