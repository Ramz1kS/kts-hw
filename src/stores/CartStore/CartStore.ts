import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import axios from 'axios';
import type { ProductData, ListResponse } from 'shared/types/types';
import apiRoutes from 'config/apiRoutes';

const E_COMMERSE_STORAGE_NAME = 'ecommerse_cart';

class CartStore {
  productIds: number[] = [];
  products: ProductData[] = [];
  isLoading = false;

  constructor() {
    makeObservable(this, {
      productIds: observable,
      products: observable,
      isLoading: observable,
      addProductId: action.bound,
      removeProductId: action.bound,
      clear: action.bound,
      loadProducts: action.bound,
      count: computed,
      price: computed,
    });
    const savedCart = localStorage.getItem(E_COMMERSE_STORAGE_NAME);
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        this.productIds = parsed;
      } catch {
        this.productIds = [];
      }
    }
  }

  addProductId(id: number) {
    if (!this.productIds.includes(id)) {
      this.productIds.push(id);
      localStorage.setItem(E_COMMERSE_STORAGE_NAME, JSON.stringify(this.productIds));
    }
  }

  removeProductId(id: number) {
    this.productIds = this.productIds.filter((productId) => productId !== id);
    this.products = this.products.filter((p) => p.id !== id);
    localStorage.setItem(E_COMMERSE_STORAGE_NAME, JSON.stringify(this.productIds));
  }

  clear() {
    this.productIds = [];
    this.products = [];
    localStorage.setItem(E_COMMERSE_STORAGE_NAME, JSON.stringify(this.productIds));
  }

  async loadProducts() {
    if (this.productIds.length === 0) {
      this.products = [];
      return;
    }

    this.isLoading = true;
    try {
      const response = await axios.get<ListResponse>(apiRoutes.products, {
        params: {
          'filters[id][$in]': this.productIds,
          'pagination[pageSize]': this.productIds.length,
        },
      });
      runInAction(() => {
        this.products = response.data.data;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        throw error;
      });
    }
  }

  get count() {
    return this.productIds.length;
  }

  get price() {
    return this.products.reduce((total, product) => total + product.price, 0);
  }
}

export const cartStore = new CartStore();
