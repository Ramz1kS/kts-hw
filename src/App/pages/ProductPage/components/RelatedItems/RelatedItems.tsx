import React from 'react';
import Text from 'components/Text';
import CardList from 'components/CardList';
import type { ProductData } from 'shared/types/types';
import classes from './RelatedItems.module.scss';

type RelatedItemsProps = {
    products?: ProductData[];
    isLoading: boolean;
    isError: boolean;
};

const RelatedItems: React.FC<RelatedItemsProps> = ({ products, isLoading, isError }) => {
    return (
        <>
            <Text tag="h2" className={classes.relatedText} weight="bold">
                Related items
            </Text>
            {isLoading ? (
                <Text>Loading related items...</Text>
            ) : isError ? (
                <Text>Error while loading related items!</Text>
            ) : !products ? (
                <Text>Related items list is empty</Text>
            ) : (
                <CardList products={products} />
            )}
        </>
    );
};

export default RelatedItems;
