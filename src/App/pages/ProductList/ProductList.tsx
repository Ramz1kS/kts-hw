import React, { useEffect, useState } from 'react';
import classes from './ProductList.module.scss';
import PageDescription from './components/PageDescription';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown from 'components/MultiDropdown';
import Text from 'components/Text';
import {
  type Option,
  type ProductData,
  type ListResponse,
  type MetaData,
} from 'types';
import CardList from 'components/CardList';
import axios, { isAxiosError } from 'axios';
import Paginator from './components/Paginator';

export const ProductList = () => {
  const [inputVal, setInputVal] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [meta, setMeta] = useState<MetaData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [errorCode, setErrorCode] = useState('');
  const url =
    'https://front-school-strapi.ktsdev.ru/api/products?populate[0]=images&populate[1]=productCategory';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get<ListResponse>(url, {
          params: {
            'pagination[pageSize]': 9,
            'pagination[page]': currentPage,
          },
        });
        setProducts(response.data.data);
        setMeta(response.data.meta);
        setTotalPages(response.data.meta.pagination.pageCount);
      } catch (error) {
        if (isAxiosError(error) && error != undefined) {
          setErrorCode(error.code == undefined ? 'Undefined code' : error.code);
        }
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage]);

  const categoryOptions: Option[] = [
    { key: 'chair', value: 'Chair' },
    { key: 'cupboard', value: 'Cupboard' },
    { key: 'table', value: 'Table' },
  ];
  return (
    <div className={classes.prodListPage}>
      <PageDescription
        name="Products"
        description="
        We display products based on the latest products we have, if you want
        to see our old products please enter the name of the item"
      ></PageDescription>
      <div className={classes.inputWrapper}>
        <Input
          value={inputVal}
          onChange={setInputVal}
          className={classes.input}
          placeholder="Search product"
          afterSlot={<Button>Find now</Button>}
        ></Input>
      </div>
      <div className={classes.multidropdownWrapper}>
        <MultiDropdown
          options={categoryOptions}
          value={selectedCategories}
          onChange={setSelectedCategories}
          getTitle={(values: Option[]) => {
            if (values.length === 0) return 'Filter';
            if (values.length === 1) return values[0].value;
            return `${values.length} categories selected`;
          }}
        ></MultiDropdown>
      </div>
      <div className={classes.totalProdsDiv}>
        {loading ? (
          <Text className={classes.totalProducts} view="title" weight="medium">
            Loading...
          </Text>
        ) : error ? (
          <Text className={classes.totalProducts} view="title" weight="medium">
            Error loading data. Error code: {errorCode}
          </Text>
        ) : (
          <>
            <Text className={classes.totalProducts} weight="bold">
              Total products
            </Text>
            <Text view="p-20" weight="bold" color="accent">
              {meta?.pagination.total}
            </Text>
          </>
        )}
      </div>
      {!loading && <CardList products={products}></CardList>}
      <div className={classes.pagination}>
        <Paginator current={currentPage} setCurrent={setCurrPage} total={totalPages}></Paginator>
      </div>
    </div>
  );
};

export default ProductList;
