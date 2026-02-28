import React from 'react';
import Text from 'components/Text';
import Button from 'components/Button';
import classes from './ProductInfo.module.scss';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import { productStore } from 'stores/ProductStore/ProductStore';
import { cartStore } from 'stores/CartStore/CartStore';
import { observer } from 'mobx-react-lite';
import ProductRating from 'components/ProductRating';

type ProductInfoProps = {
  title?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  rating?: number;
  isInStock?: boolean;
  discountPercent: number;
  id: number;
};

const ProductInfo: React.FC<ProductInfoProps> = observer(
  ({ title, description, price, imageUrl, rating, discountPercent, isInStock, id }) => {
    return (
      <div className={classes['product-info']}>
        <motion.div
          className={classes['product-info__image']}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {productStore.isLoading ? (
            <Skeleton className={classes['product-info__image']} />
          ) : (
            <motion.img className={classes['product-info__image']} src={imageUrl} alt={title} />
          )}
        </motion.div>
        <motion.div
          className={classes['product-info__content']}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className={classes['product-info__description']}>
            <Text tag="h1" view="title" weight="bold">
              {productStore.isLoading ? <Skeleton></Skeleton> : (title ?? 'No title found')}
            </Text>
            {productStore.isLoading ? (
              <Skeleton></Skeleton>
            ) : rating !== undefined ? (
              <ProductRating rating={rating} size={18} gap={3}></ProductRating>
            ) : null}
            {productStore.isLoading ? (
              <Skeleton count={5}></Skeleton>
            ) : (
              <Text color="secondary" view="p-20">
                {productStore.isLoading ? (
                  <Skeleton></Skeleton>
                ) : (
                  (description ?? 'No description was provided')
                )}
              </Text>
            )}
          </div>
          <div className={classes['product-info__actions']}>
            <div className={classes['product-info__price']}>
              <Text
                view="title"
                weight="bold"
                color={discountPercent !== undefined ? 'accent' : 'primary'}
                className={classes['product-info__price-current']}
              >
                {productStore.isLoading ? (
                  <Skeleton count={1} width={80}></Skeleton>
                ) : price !== undefined ? (
                  `$${price}`
                ) : (
                  'No price found!'
                )}
              </Text>
              <Text
                view="p-22"
                weight="bold"
                color="secondary"
                className={classes['product-info__price-old']}
              >
                {!productStore.isLoading && discountPercent !== 0
                  ? `$${Math.round((price! / (100 - discountPercent)) * 100)}`
                  : null}
              </Text>
            </div>
            <div className={classes['product-info__buttons']}>
              <Button disabled>{isInStock ? 'Buy now' : 'Not in stock'}</Button>
              <Button
                className={classes['product-info__button_cart']}
                onClick={() => cartStore.addProductId(id)}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }
);

export default ProductInfo;
