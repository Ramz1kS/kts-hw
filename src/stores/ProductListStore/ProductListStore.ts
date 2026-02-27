import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import axios from 'axios';
import type { CategoryData, CategoryResponse, ListResponse } from 'shared/types/types';
import apiRoutes from 'config/apiRoutes';

const PAGE_SIZE = 9;
const PAGE_PARAM = 'page';

class ProductListStore {
  products: ListResponse | null = null;
  isLoading = false;
  isError = false;
  errorCode = '';
  searchQuery = '';

  availableCategories: CategoryData[] = [];
  selectedCategories: CategoryData[] = [];
  isLoadingCategories = false;
  isErrorCategories = false;
  errorCodeCategories = '';

  currentPage = 1;

  constructor() {
    makeObservable(this, {
      products: observable,
      isLoading: observable,
      isError: observable,
      errorCode: observable,
      currentPage: observable,
      searchQuery: observable,
      selectedCategories: observable,
      availableCategories: observable,
      isLoadingCategories: observable,
      isErrorCategories: observable,
      setPage: action.bound,
      setSearchQuery: action.bound,
      setCategories: action.bound,
      loadProducts: action.bound,
      totalPages: computed,
      totalProducts: computed,
    });
    const pageParam = new URLSearchParams(window.location.search).get(PAGE_PARAM);
    this.currentPage = parseInt(pageParam ?? '1');
    this.loadAvailableCategories();
  }

  setPage(newPage: number) {
    const params = new URLSearchParams(window.location.search);
    params.set(PAGE_PARAM, newPage.toString());
    window.history.pushState({}, ``, `?` + params.toString());
    this.currentPage = newPage;
    this.loadProducts();
  }

  setSearchQuery(query: string) {
    this.searchQuery = query;
  }

  setCategories(categories: CategoryData[]) {
    this.selectedCategories = categories;
  }

  async loadProducts() {
    this.isLoading = true;
    this.isError = false;
    try {
      const config = {
        params: {
          'pagination[pageSize]': PAGE_SIZE,
          'pagination[page]': this.currentPage,
          filters: {
            title: {
              $containsi: this.searchQuery,
            },
            productCategory: {
              id: {
                $in: this.selectedCategories.map((c) => c.id),
              },
            },
          },
        },
      };

      const response = await axios.get<ListResponse>(apiRoutes.products, config);
      runInAction(() => {
        this.products = response.data;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.isError = true;
        this.errorCode = axios.isAxiosError(error) ? (error.code ?? 'Unknown') : 'Unknown';
        this.isLoading = false;
      });
    }
  }

  get totalPages() {
    return this.products?.meta.pagination.pageCount ?? 1;
  }

  get totalProducts() {
    return this.products?.meta.pagination.total ?? 0;
  }

  private async loadAvailableCategories() {
    this.isLoadingCategories = true;
    this.isErrorCategories = false;
    try {
      const response = await axios.get<CategoryResponse>(apiRoutes.categories);
      runInAction(() => {
        this.availableCategories = response.data.data;
        this.isLoadingCategories = false;
      });
    } catch (error) {
      runInAction(() => {
        this.isErrorCategories = true;
        this.errorCodeCategories = axios.isAxiosError(error)
          ? (error.code ?? 'Unknown')
          : 'Unknown';
        this.isLoadingCategories = true;
      });
    }
  }
}

export const productListStore = new ProductListStore();
