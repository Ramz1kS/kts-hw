import React, { useMemo, useState } from 'react';
import classes from './ProductList.module.scss';
import PageDescription from './components/PageDescription';
import SearchFilter from './components/SearchFilter';
import ProductsStatus from './components/ProductsStatus';
import {
    type Option,
    type ProductData,
    type ListResponse,
} from 'shared/types/types';
import CardList from 'components/CardList';
import Paginator from './components/Paginator';
import apiRoutes from 'config/apiRoutes';
import { useAxios } from 'hooks/useAxios';
import { categoryOptions } from 'config/filterConfig';

const PAGE_SIZE = 9

export const ProductList = () => {
    const [inputVal, setInputVal] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);
    const [currentPage, setCurrPage] = useState(1);

    const params = useMemo(() => ({
        'pagination[pageSize]': PAGE_SIZE,
        'pagination[page]': currentPage,
    }), [currentPage]);

    const { data, isLoading, isError, errorInfo } = useAxios<ListResponse>(apiRoutes.products, params);
    return (
        <div className={classes.prodListPage}>
            <PageDescription
                name="Products"
                description="
        We display products based on the latest products we have, if you want
        to see our old products please enter the name of the item"
            />
            <SearchFilter
                inputVal={inputVal}
                setInputVal={setInputVal}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                categoryOptions={categoryOptions}
            />
            <ProductsStatus
                isLoading={isLoading}
                isError={isError}
                errorCode={errorInfo?.errorCode ?? ''}
                total={data?.meta.pagination.total}
            />
            {!isLoading && <CardList products={data?.data ?? []} />}
            <div className={classes.pagination}>
                <Paginator current={currentPage} setCurrent={setCurrPage} total={data?.meta.pagination.pageCount ?? 1} />
            </div>
        </div>
    );
};

export default ProductList;
