import React from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown from 'components/MultiDropdown';
import { type CategoryData } from 'shared/types/types';
import classes from './SearchFilter.module.scss';
import { productListStore } from 'stores/ProductListStore/ProductListStore';
import { observer } from 'mobx-react-lite';
import Skeleton from 'react-loading-skeleton';
import CheckBox from 'components/CheckBox';
import Text from 'components/Text';

const SearchFilter: React.FC = observer(() => {
  const titleFunc = (values: CategoryData[]) => {
    if (values.length === 0) return 'Filter';
    if (values.length === 1) return values[0].title;
    return `${values.length} categories selected`;
  };

  return (
    <>
      <div className={classes['search-filter__input-wrapper']}>
        <Input
          value={productListStore.searchQuery}
          onChange={productListStore.setSearchQuery}
          className={classes['search-filter__input']}
          placeholder="Search product"
          afterSlot={
            <Button
              onClick={() => {
                productListStore.loadProducts();
              }}
              className={classes['search-filter__button']}
            >
              Find now
            </Button>
          }
        />
      </div>
      <div className={classes['search-filter__wrapper']}>
        <div className={classes['search-filter__dropdown-wrapper']}>
          {productListStore.isLoadingCategories ? (
            <Skeleton width={350} height={52}></Skeleton>
          ) : productListStore.isErrorCategories ? (
            <p>Could not load categories</p>
          ) : (
            <MultiDropdown
              options={productListStore.availableCategories}
              value={productListStore.selectedCategories}
              onChange={productListStore.setCategories}
              getTitle={titleFunc}
            />
          )}
        </div>
        <div className={classes['search-filter__checkbox-wrapper']}>
          <Text view="p-20" weight="medium">
            Stock only:{' '}
          </Text>
          <CheckBox
            checked={productListStore.inStockOnly}
            onChange={productListStore.setInStockOnly}
          ></CheckBox>
        </div>
      </div>
    </>
  );
});

export default SearchFilter;
