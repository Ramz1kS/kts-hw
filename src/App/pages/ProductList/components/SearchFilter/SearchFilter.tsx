import React from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown from 'components/MultiDropdown';
import { type CategoryData } from 'shared/types/types';
import classes from './SearchFilter.module.scss';
import { productListStore } from 'stores/ProductListStore/ProductListStore';
import { observer } from 'mobx-react-lite';
import Skeleton from 'react-loading-skeleton';

type SearchFilterProps = {
  inputVal: string;
  setInputVal: (value: string) => void;
  selectedCategories: CategoryData[];
  setSelectedCategories: (value: CategoryData[]) => void;
  categoryOptions: CategoryData[];
};

const SearchFilter: React.FC<SearchFilterProps> = observer(
  ({ inputVal, setInputVal, selectedCategories, setSelectedCategories, categoryOptions }) => {
    const titleFunc = (values: CategoryData[]) => {
      if (values.length === 0) return 'Filter';
      if (values.length === 1) return values[0].title;
      return `${values.length} categories selected`;
    };
    return (
      <>
        <div className={classes.inputWrapper}>
          <Input
            value={inputVal}
            onChange={setInputVal}
            className={classes.input}
            placeholder="Search product"
            afterSlot={
              <Button
                onClick={() => {
                  productListStore.setSearchQuery(inputVal);
                  productListStore.loadProducts();
                }}
              >
                Find now
              </Button>
            }
          />
        </div>
        <div className={classes.multidropdownWrapper}>
          {productListStore.isLoadingCategories ? (
            <Skeleton width={350} height={52}></Skeleton>
          ) : productListStore.isErrorCategories ? (
            <p>Could not load categories</p>
          ) : (
            <MultiDropdown
              options={categoryOptions}
              value={selectedCategories}
              onChange={setSelectedCategories}
              getTitle={titleFunc}
            />
          )}
        </div>
      </>
    );
  }
);

export default SearchFilter;
