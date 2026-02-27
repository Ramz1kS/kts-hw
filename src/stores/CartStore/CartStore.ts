import { action, computed, makeObservable, observable } from 'mobx';
import type { ProductData } from 'shared/types/types';

class CartStore {
  products: ProductData[] = [];

  constructor() {
    makeObservable(this, {
      products: observable,
      addProduct: action.bound,
      removeProduct: action.bound,
      removeProductById: action.bound,
      clear: action.bound,
      count: computed,
      price: computed,
    });
  }

  addProduct(prod: ProductData) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === prod.id) {
        return;
      }
    }
    this.products.push(prod);
  }

  removeProduct(prod: ProductData) {
    this.removeProductById(prod.id);
  }

  removeProductById(id: number) {
    this.products = this.products.filter((p) => p.id !== id);
  }

  clear() {
    this.products = [];
  }

  get count() {
    return this.products.length;
  }

  get price() {
    let total = 0;
    this.products.forEach((p) => (total += p.price));
    return total;
  }
}

export const cartStore = new CartStore();
