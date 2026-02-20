import React from 'react';
import classes from './CardList.module.scss';
import Button from 'components/Button';
import Card from 'components/Card';
import type { ProductData } from 'types';
import { Link } from 'react-router';

interface CardListInterface {
  products: ProductData[];
}

const CardList: React.FC<CardListInterface> = ({ products }) => {
  return (
    <div className={classes.productsListFlex}>
      {products.map((product) => (
        <Link
          key={product.id}
          to={`/product/${product.documentId}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
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
                  console.log('Added:', product);
                }}
              >
                Add to Cart
              </Button>
            }
          />
        </Link>
      ))}
    </div>
  );
};

export default CardList;
