import { Injectable, signal } from '@angular/core';
import {Image} from "../interface/image.interface"
import { ShoppingItem } from '../interface/shopping-item.interface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCardService {
   count = signal(0);
   shoppingList= signal<ShoppingItem[]>([]);
   shoppingSideBar = signal<boolean>(false);
   totalPrice = signal(0);


//open and close the side bar if click on cart
  openShoppingSideBar()
  {
    this.shoppingSideBar.set(!this.shoppingSideBar());
  }

//update the global count 
  updateCount(quantity:number,incrase:boolean) {
    if(incrase)
    this.count.update((value) => value + quantity);
    else
    this.count.update((value) => value - quantity);
  }

  //update the total price 
  updateTotalPrice(price:number,incrase:boolean)
  {
    if(incrase)
    this.totalPrice.update((value) => value + price);
    else
    this.totalPrice.update((value) => value - price);

  }
 


//add Item(Image) to shopping cart 
//triger( Add to cart/image item component ) / + in shopping-list-item
  addItemToCart(image:Image)
  {
    this.updateCount(1,true);
    this.updateTotalPrice(image.price,true);
    this.checkIfImageExsist(image);
  }


  // Check if the image exists in the shopping list and update quantity/price accordingly or crete new item 
  checkIfImageExsist(image:Image){
    const existingItem = this.shoppingList().find(item => item.image === image);
    if (existingItem) {
        this.updateQuantityAndPrice(existingItem)
    } else {
      this.shoppingList.mutate(values => values.push({ image, quantity: 1,price:image.price }));
    }
   }


   //update the Quantity and price of shopping element 
   updateQuantityAndPrice(shoppingItem:ShoppingItem | undefined)
   {
    if(typeof shoppingItem === 'undefined')
    {
        return;
    }
    shoppingItem.quantity++;
    shoppingItem.price=shoppingItem.quantity*shoppingItem.image.price;
   }


  //remove item from cart and update the side effect like price and Quantity
  removeItemFromCart(ShoppingItem:ShoppingItem | undefined)
  {
    if(typeof ShoppingItem === 'undefined')
    {
        return;
    }
    const index = this.shoppingList().findIndex(item => item === ShoppingItem);
    if (index !== -1) {
      this.shoppingList().splice(index, 1);
      this.updateCount(ShoppingItem.quantity,false);
      this.updateTotalPrice(ShoppingItem.price,false);
    }
    
}

decreaseQuantity(shoppingItem:ShoppingItem | undefined){
    if(typeof shoppingItem === 'undefined' || shoppingItem.quantity === 1)
    {
        return;
    }

    shoppingItem.quantity--;
    shoppingItem.price=shoppingItem.price-shoppingItem.image.price;

    this.updateTotalPrice(shoppingItem.image.price,false);
    this.updateCount(1,false);    
}


}
