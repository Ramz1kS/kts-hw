import { action, makeObservable, observable, runInAction } from 'mobx';
import axios from 'axios';
import type { ListResponse, ProductData, ProductPageResponse } from 'shared/types/types';
import apiRoutes from 'config/apiRoutes';

class ProductStore {
  product: ProductData | null = null;
  relatedProducts: ProductData[] = [];
  isLoading = false;
  isError = false;
  errorCode = '';
  isLoadingRelated = false;
  isErrorRelated = false;
  errorCodeRelated = '';
  constructor() {
    makeObservable(this, {
      product: observable,
      relatedProducts: observable,
      isLoading: observable,
      isError: observable,
      errorCode: observable,
      isLoadingRelated: observable,
      isErrorRelated: observable,
      loadProduct: action.bound,
      loadRelatedProducts: action.bound,
    });
  }

  async loadProduct(documentId: string) {
    this.isLoading = true;
    this.isError = false;
    try {
      const response = await axios.get<ProductPageResponse>(apiRoutes.getProductURL(documentId));
      runInAction(() => {
        this.product = response.data.data;
        this.isLoading = false;
      });
      console.log(this.product);
    } catch (error) {
      runInAction(() => {
        this.isError = true;
        this.errorCode = axios.isAxiosError(error)
          ? (error.response?.status?.toString() ?? 'Unknown')
          : 'Unknown';
        this.isLoading = false;
      });
    }
  }

  async loadRelatedProducts() {
    this.isLoadingRelated = true;
    this.isErrorRelated = false;
    try {
      const response = await axios.get<ListResponse>(apiRoutes.products, {
        params: { 'pagination[pageSize]': 3 },
      });
      runInAction(() => {
        this.relatedProducts = response.data.data;
        this.isLoadingRelated = false;
      });
    } catch (error) {
      runInAction(() => {
        this.isErrorRelated = true;
        this.errorCodeRelated = axios.isAxiosError(error)
          ? (error.response?.status?.toString() ?? 'Unknown')
          : 'Unknown';
        this.isLoadingRelated = false;
      });
    }
  }
}

export const productStore = new ProductStore();
