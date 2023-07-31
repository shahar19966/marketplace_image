import { Injectable, computed, signal } from '@angular/core';
import { Image } from '../interfaces/image.interface';
import { ShoppingItem } from '../interfaces/shopping-item.interface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCardService {
  showSidebar = signal(false);

  shoppingList = signal(
    this.getFromLocalStorage<ShoppingItem[]>('shoppingList', [])
  );

  totalPrice = computed(() => {
    let sum = 0;
    for (const item of this.shoppingList()) {
      sum += item.price;
    }
    return sum;
  });

  totalQuantity = computed(() => {
    let sum = 0;
    for (const item of this.shoppingList()) {
      sum += item.quantity;
    }
    return sum;
  });

  //open and close the side bar if click on cart
  openShoppingSideBar() {
    this.showSidebar.set(!this.showSidebar());
  }

  //add image to shopping cart
  addImage(image: Image) {
    const findImage = this.findImage(image);

    // image does not exists in shopping cart, add it
    if (!findImage) {
      this.shoppingList.mutate((values) =>
        values.push({ image, quantity: 1, price: image.price })
      );
    } else {
      // increase quantity
      findImage.quantity += 1;
      // this.shoppingList.mutate(())
    }

    this.saveToLocalStorage();
  }

  //remove item from cart and update the side effect like price and Quantity
  removeItemFromCart(shoppingItem: ShoppingItem) {
    if (!shoppingItem) {
      return;
    }

    const index = this.shoppingList().findIndex(
      (item) => item === shoppingItem
    );
    if (index !== -1) {
      this.shoppingList().splice(index, 1);
    }
    this.saveToLocalStorage();
  }

  // Check if the image exists in the shopping list
  findImage(image: Image) {
    return this.shoppingList().find((item) => item.image === image);
  }

  // increse the Quantity and price of shopping element
  increseQuantityAndPrice(shoppingItem: ShoppingItem | undefined) {
    if (typeof shoppingItem === 'undefined') {
      return;
    }
    shoppingItem.quantity++;
    shoppingItem.price = shoppingItem.quantity * shoppingItem.image.price;
    this.saveToLocalStorage();
  }

  // decrese the Quantity and price of shopping element
  decreaseQuantityAndCount(shoppingItem: ShoppingItem | undefined) {
    if (typeof shoppingItem === 'undefined' || shoppingItem.quantity === 1) {
      return;
    }

    shoppingItem.quantity--;
    shoppingItem.price = shoppingItem.price - shoppingItem.image.price;

    this.saveToLocalStorage();
  }

  //save update to LocalStorage
  saveToLocalStorage() {
    localStorage.setItem('count', JSON.stringify(this.totalQuantity()));
    localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice()));
    localStorage.setItem('shoppingList', JSON.stringify(this.shoppingList()));
  }

  //get items from LocalStorage <T> the value can be string or number
  getFromLocalStorage<T>(key: string, defaultValue: T): T {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return defaultValue;
  }
}
