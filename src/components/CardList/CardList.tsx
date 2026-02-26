import React from 'react';
import classes from './CardList.module.scss';
import Button from 'components/Button';
import Card from 'components/Card';
import type { ProductData } from 'shared/types/types';
import { Link } from 'react-router';

interface CardListInterface {
    products: ProductData[];
}

const CardList: React.FC<CardListInterface> = ({ products }) => {
    return (
        <ul className={classes.productsListFlex}>
            {products.map((product) => (
                <li>
                <Link
                    key={product.id}
                    to={`/product/${product.documentId}`}
                    className={classes.cardLink}
                >
                    <article>
                    <Card
                        image={product.images.length != 0 ? product.images[0].formats.small.url : ''}
                        captionSlot={product.productCategory.title}
                        title={product.title}
                        subtitle={product.description}
                        contentSlot={`$${product.price}`}
                        actionSlot={
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                }}
                            >
                                Add to Cart
                            </Button>
                        }
                    />
                    </article>
                </Link>
                </li>
            ))}
        </ul>
    );
};

export default CardList;
