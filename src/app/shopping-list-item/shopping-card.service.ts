import { Injectable, signal } from '@angular/core';
import { Image } from '../interfaces/image.interface';
import { ShoppingItem } from '../interfaces/shopping-item.interface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCardService {
  //global val
  shoppingSideBar = signal<boolean>(false);
  count = signal(this.getFromLocalStorage('count', 0));
  totalPrice = signal(this.getFromLocalStorage('totalPrice', 0));

  shoppingList = signal<ShoppingItem[]>(
    this.getFromLocalStorage('shoppingList', [])
  );

  //open and close the side bar if click on cart
  openShoppingSideBar() {
    this.shoppingSideBar.set(!this.shoppingSideBar());
  }

  //update the global count
  updateCount(quantity: number, incrase: boolean) {
    if (incrase) this.count.update((value) => value + quantity);
    else this.count.update((value) => value - quantity);
  }

  //update the total price
  updateTotalPrice(price: number, incrase: boolean) {
    if (incrase) this.totalPrice.update((value) => value + price);
    else this.totalPrice.update((value) => value - price);
  }

  //add Item(Image) to shopping cart
  addItemToCart(image: Image) {
    this.updateCount(1, true);
    this.updateTotalPrice(image.price, true);
    this.checkIfImageExsist(image);
    this.saveToLocalStorage();
  }

  //remove item from cart and update the side effect like price and Quantity
  removeItemFromCart(ShoppingItem: ShoppingItem | undefined) {
    if (typeof ShoppingItem === 'undefined') {
      return;
    }
    const index = this.shoppingList().findIndex(
      (item) => item === ShoppingItem
    );
    if (index !== -1) {
      this.shoppingList().splice(index, 1);
      this.updateCount(ShoppingItem.quantity, false);
      this.updateTotalPrice(ShoppingItem.price, false);
    }
    this.saveToLocalStorage();
  }

  // Check if the image exists in the shopping list and update quantity/price accordingly or crete new item
  checkIfImageExsist(image: Image) {
    const existingItem = this.shoppingList().find(
      (item) => item.image === image
    );
    if (existingItem) {
      this.increseQuantityAndPrice(existingItem);
    } else {
      this.shoppingList.mutate((values) =>
        values.push({ image, quantity: 1, price: image.price })
      );
    }
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

    this.updateTotalPrice(shoppingItem.image.price, false);
    this.updateCount(1, false);
    this.saveToLocalStorage();
  }

  //save update to LocalStorage
  saveToLocalStorage() {
    localStorage.setItem('count', JSON.stringify(this.count()));
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
