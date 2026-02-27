import React from 'react';
import Text from 'components/Text';
import Button from 'components/Button';
import classes from './ProductInfo.module.scss';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import { productStore } from 'stores/ProductStore/ProductStore';
import { observer } from 'mobx-react-lite';
import ProductRating from 'components/ProductRating';

type ProductInfoProps = {
    title?: string;
    description?: string;
    price?: number;
    imageUrl?: string;
    rating?: number
};

const ProductInfo: React.FC<ProductInfoProps> = observer(({ title, description, price, imageUrl, rating }) => {
    return (
        <div className={classes.productInfo}>
            <motion.div 
            className={classes.prodImage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}>
            {
                productStore.isLoading ? 
                <Skeleton className={classes.prodImage}/> 
                :
                <motion.img
                className={classes.prodImage}
                src={imageUrl}
                alt={title}
                />
            }
            </motion.div>
            <motion.div
                className={classes.prodRightInfo}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                <div className={classes.prodNameDesc}>
                    <Text tag="h1" view="title" weight="bold">
                        {productStore.isLoading ? <Skeleton></Skeleton> : title ?? 'No title found'}
                    </Text>
                    {productStore.isLoading ? <Skeleton></Skeleton> : 
                    rating !== undefined ? <ProductRating rating={rating} size={18} gap={3}></ProductRating> : null}
                    {productStore.isLoading ? <Skeleton count={5}></Skeleton> : 
                    <Text color="secondary" view="p-20">
                        {productStore.isLoading ? <Skeleton></Skeleton> : description ?? 'No description was provided'}
                    </Text>}
                </div>
                <div className={classes.costAndButtons}>
                    <Text view="title" weight="bold">
                        {productStore.isLoading ? 
                        <Skeleton count={1} width={80}></Skeleton> 
                        : 
                        price != undefined ? 
                        `$${price}` 
                        : 'No price found!'}
                    </Text>
                    <div className={classes.buttons}>
                        <Button>Buy now</Button>
                        <Button className={classes.addToCart}>Add to cart</Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
});

export default ProductInfo;
