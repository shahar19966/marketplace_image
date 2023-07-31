import { Injectable, computed, signal, effect } from '@angular/core';
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

  //calculates the total cost of the items in the shopping list
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

  //add image to shopping list
  addImage(image: Image) {
    this.shoppingList.mutate((list) => {
      const item = list.find((item) => item.image === image);

      if (!item) {
        // Image does not exist in shopping cart, add it
        list.push({ image, quantity: 1, price: image.price });
      } else {
        // Image exists in shopping cart, increase quantity and update price
        item.quantity++;
        item.price += image.price;
      }
    });
  }

  //remove item from cart and update the side effect like price and Quantity
  removeItemFromCart(shoppingItem: ShoppingItem) {
    if (!shoppingItem) {
      return;
    }
    this.shoppingList.mutate((value) => {
      const index = value.indexOf(shoppingItem);
      if (index > -1) {
        value.splice(index, 1);
      }
    });
  }

  removeQuantityFromCart(shoppingItem: ShoppingItem) {
    this.shoppingList.mutate(() => {
      const item = this.shoppingList().find((item) => item === shoppingItem);
      if (item && item.quantity > 1) {
        // Item exists in the shopping cart, decrease quantity and update price
        item.quantity--;
        item.price -= item.image.price;
      }
    });
  }

  //save shoppingList in every change
  saveToLocalStorageEffect = effect((): void => {
    localStorage.setItem('shoppingList', JSON.stringify(this.shoppingList()));
  });

  //get items from LocalStorage <T> the value can be string or number
  getFromLocalStorage<T>(key: string, defaultValue: T): T {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return defaultValue;
  }
}
