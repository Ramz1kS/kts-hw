export type pageName = 'Products' | 'Categories' | 'About us'
export type Product = {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  price: number;
  image: string;
}
export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

export type ErrorInfo = {
    errorCode: string,
    errorStatus: number
}

type ProductImageData = {
    id: number;
    url: string;
}

export type ProductImage = {
    id: number;
    url: string;
    formats: {
        large: {
            id: number;
            url: string;
        }
        medium: {
            id: number;
            url: string;
        }
        small: {
            id: number;
            url: string;
        }
    }
}

export type MetaData = {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number
    }
}

export type ProductData = {
    id: number;
    documentId: string;
    title: string;
    description: string;
    price: number;
    discountPercent: number;
    rating: number;
    isInStock: boolean;
    productCategory: {
        title: string
    };
    images: ProductImage[];
}

export type ListResponse = {
    data: ProductData[];
    meta: MetaData
}

export type ProductPageResponse = {
    data: ProductData,
    meta: MetaData
}