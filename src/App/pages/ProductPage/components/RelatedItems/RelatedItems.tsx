import React from 'react';
import Text from 'components/Text';
import CardList from 'components/CardList';
import classes from './RelatedItems.module.scss';
import { cartStore } from 'stores/CartStore/CartStore';
import { productStore } from 'stores/ProductStore/ProductStore';
import { observer } from 'mobx-react-lite';
import CardListSkeleton from 'components/CardListSkeleton';

const RelatedItems: React.FC = observer(() => {
    return (
        <>
            <Text tag="h2" className={classes.relatedText} weight="bold">
                Related items
            </Text>
            {productStore.isLoadingRelated ? (
                <CardListSkeleton count={3}></CardListSkeleton>
            ) : productStore.isErrorRelated ? (
                <Text>Error while loading related items!</Text>
            ) : (productStore.relatedProducts.length == 0) ? (
                <Text>Related items list is empty</Text>
            ) : (
                <CardList buttonText='Add to cart' onButtonClick={cartStore.addProduct} products={productStore.relatedProducts} />
            )}
        </>
    );
});

export default RelatedItems;
