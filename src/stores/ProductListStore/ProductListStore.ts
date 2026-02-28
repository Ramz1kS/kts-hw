import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import axios from 'axios';
import type { CategoryData, CategoryResponse, ListResponse } from 'shared/types/types';
import apiRoutes from 'config/apiRoutes';

const PAGE_SIZE = 9;
const PAGE_PARAM = 'page';
const STOCK_PARAM = 'stockOnly';
const SEARCH_PARAM = 'search';
const CATEGORY_PARAM = 'categories';

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
  inStockOnly = false;

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
      inStockOnly: observable,
      setPage: action.bound,
      setSearchQuery: action.bound,
      setCategories: action.bound,
      loadProducts: action.bound,
      setInStockOnly: action.bound,
      totalPages: computed,
      totalProducts: computed,
    });
    const params = new URLSearchParams(window.location.search);
    this.currentPage = parseInt(params.get(PAGE_PARAM) ?? '1');
    this.inStockOnly = parseInt(params.get(STOCK_PARAM) ?? '0') > 0;
    this.searchQuery = params.get(SEARCH_PARAM) ?? '';
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
    const params = new URLSearchParams(window.location.search);
    if (query) {
      params.set(SEARCH_PARAM, query);
    } else {
      params.delete(SEARCH_PARAM);
    }
    window.history.pushState({}, '', '?' + params.toString());
  }

  setCategories(categories: CategoryData[]) {
    this.selectedCategories = categories;
    const params = new URLSearchParams(window.location.search);
    if (categories.length > 0) {
      params.set(CATEGORY_PARAM, categories.map((c) => c.id).join(','));
    } else {
      params.delete(CATEGORY_PARAM);
    }
    window.history.pushState({}, '', '?' + params.toString());
  }

  setInStockOnly(val: boolean) {
    this.inStockOnly = val;
  }

  async loadProducts() {
    const params = new URLSearchParams(window.location.search);
    params.set(STOCK_PARAM, this.inStockOnly.toString());
    window.history.pushState({}, ``, `?` + params.toString());
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
            isInStock: {
              $in: this.inStockOnly ? [true] : [false, true],
            },
          },
        },
      };

      const response = await axios.get<ListResponse>(apiRoutes.products, config);
      runInAction(() => {
        if (this.currentPage > response.data.meta.pagination.pageCount) {
          this.setPage(response.data.meta.pagination.pageCount);
        } else if (this.currentPage < 1 && response.data.meta.pagination.pageCount != 0) {
          this.setPage(1);
        }
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
        const params = new URLSearchParams(window.location.search);
        const categoryIds =
          params
            .get(CATEGORY_PARAM)
            ?.split(',')
            .map((id) => parseInt(id)) ?? [];
        this.selectedCategories = this.availableCategories.filter((c) =>
          categoryIds.includes(c.id)
        );
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
