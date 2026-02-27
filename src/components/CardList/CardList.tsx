import React from 'react';
import classes from './CardList.module.scss';
import Button from 'components/Button';
import Card from 'components/Card';
import type { ProductData } from 'shared/types/types';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import Text from 'components/Text';
import { observer } from 'mobx-react-lite';
import Skeleton from 'react-loading-skeleton';

interface CardListInterface {
    products: ProductData[];
    buttonText: string
    onButtonClick?: (val: ProductData) => void
}

const CardList: React.FC<CardListInterface> = observer(({ products, buttonText, onButtonClick }) => {
    return (
        <>
        {products.length == 0 ? 
            <Text tag='h2' view='button' color='accent'>No products found.</Text>
         :
            <ul className={classes.productsListFlex}>
            {products.map((product, index) => (
                <motion.li
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                <Link
                    to={`/product/${product.documentId}`}
                    className={classes.cardLink}
                >
                    <article>
                    <Card
                        image={product.images.length != 0 ? product.images[0].formats.small.url : undefined}
                        captionSlot={product.productCategory.title || <Skeleton></Skeleton>}
                        title={product.title}
                        subtitle={product.description || <Skeleton count={3}></Skeleton>}
                        contentSlot={product.price ? `$${product.price}` : <Skeleton width={40}></Skeleton>}
                        rating={product.rating}
                        actionSlot={
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    if (onButtonClick != undefined)
                                        onButtonClick(product)
                                }}
                            >
                                {buttonText}
                            </Button>
                        }
                    />
                    </article>
                </Link>
                </motion.li>
            ))}
        </ul>}
        </>
    );
});

export default CardList;
