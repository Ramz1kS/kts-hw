import React, { useEffect } from 'react';
import classes from './ProductList.module.scss';
import PageDescription from './components/PageDescription';
import SearchFilter from './components/SearchFilter';
import ProductsStatus from './components/ProductsStatus';
import CardList from 'components/CardList';
import Paginator from './components/Paginator';
import { cartStore } from 'stores/CartStore/CartStore';
import { productListStore } from 'stores/ProductListStore/ProductListStore';
import { observer } from 'mobx-react-lite';
import CardListSkeleton from 'components/CardListSkeleton';

export const ProductList = observer(() => {
    useEffect(() => {
        productListStore.loadProducts();
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [productListStore.currentPage])
    return (
        <div className={classes.prodListPage}>
            <PageDescription
                name="Products"
                description="
        We display products based on the latest products we have, if you want
        to see our old products please enter the name of the item"
            />
            <SearchFilter
                inputVal={productListStore.searchQuery}
                setInputVal={productListStore.setSearchQuery}
                selectedCategories={productListStore.selectedCategories}
                setSelectedCategories={productListStore.setCategories}
                categoryOptions={productListStore.availableCategories}
            />
            <ProductsStatus
                isLoading={productListStore.isLoading}
                isError={productListStore.isError}
                errorCode={productListStore.errorCode}
                total={productListStore.totalProducts}
            />
            {productListStore.isLoading ? 
                <CardListSkeleton count={6}></CardListSkeleton>
            : (
                <CardList
                    buttonText="Add to cart"
                    products={productListStore.products?.data ?? []}
                    onButtonClick={cartStore.addProduct}
                />
            )}
            {!productListStore.isLoading && !productListStore.isError ? <div className={classes.pagination}>
                <Paginator
                    current={productListStore.currentPage}
                    setCurrent={productListStore.setPage}
                    total={productListStore.totalPages}
                />
            </div> : null}
        </div>
    );
});

export default ProductList;
