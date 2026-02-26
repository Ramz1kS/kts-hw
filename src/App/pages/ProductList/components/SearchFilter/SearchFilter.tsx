import React from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import MultiDropdown from 'components/MultiDropdown';
import { type Option } from 'shared/types/types';
import classes from './SearchFilter.module.scss';

type SearchFilterProps = {
    inputVal: string;
    setInputVal: (value: string) => void;
    selectedCategories: Option[];
    setSelectedCategories: (value: Option[]) => void;
    categoryOptions: Option[];
};

const SearchFilter: React.FC<SearchFilterProps> = ({
    inputVal,
    setInputVal,
    selectedCategories,
    setSelectedCategories,
    categoryOptions,
}) => {
    const titleFunc = (values: Option[]) => {
        if (values.length === 0) return 'Filter';
        if (values.length === 1) return values[0].value;
        return `${values.length} categories selected`;
    }
    return (
        <>
            <div className={classes.inputWrapper}>
                <Input
                    value={inputVal}
                    onChange={setInputVal}
                    className={classes.input}
                    placeholder="Search product"
                    afterSlot={<Button>Find now</Button>}
                />
            </div>
            <div className={classes.multidropdownWrapper}>
                <MultiDropdown
                    options={categoryOptions}
                    value={selectedCategories}
                    onChange={setSelectedCategories}
                    getTitle={titleFunc}
                />
            </div>
        </>
    );
};

export default SearchFilter;
