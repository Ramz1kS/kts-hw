import React from 'react';
import classes from './ProductPage.module.scss';
import Text from 'components/Text';
import Button from 'components/Button';
import type { ProductData } from 'types';
import { useNavigate, useParams } from 'react-router';
import { useAxios } from 'hooks/useAxios';
import ArrowLeft from 'assets/arrow-left.svg';
import CardList from 'components/CardList';

export const ProductPage = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const url = `https://front-school-strapi.ktsdev.ru/api/products/${documentId}?populate[0]=images&populate[1]=productCategory`;
  const relatedUrl =
    'https://front-school-strapi.ktsdev.ru/api/products?populate[0]=images&populate[1]=productCategory&pagination[pageSize]=3';
  const { data: product, loading, error } = useAxios<ProductData>(url);
  const { data: relatedData, loading: loadingRelated, error: errorRelated } = useAxios<ProductData[]>(relatedUrl);

  if (error) {
    navigate('/404');
    return null;
  }
  return (
    <div className={classes.productPage}>
      <button className={classes.backButton} onClick={() => navigate(-1)}>
        <img src={ArrowLeft} alt="Back" />
        <Text view="p-20" weight="normal">
          Назад
        </Text>
      </button>
      {loading ? (
        <Text view="title" weight="medium">
          Loading...
        </Text>
      ) : (
        <>
          <div className={classes.productInfo}>
            <img className={classes.prodImage} src={product?.images[0].formats.large.url}></img>
            <div className={classes.prodRightInfo}>
              <div className={classes.prodNameDesc}>
                <Text view="title" weight="bold">
                  {product?.title}
                </Text>
                <Text color="secondary" view="p-20">
                  {product?.description}
                </Text>
              </div>
              <div className={classes.costAndButtons}>
                <Text view="title" weight="bold">
                  ${product?.price}
                </Text>
                <div className={classes.buttons}>
                  <Button>Buy now</Button>
                  <Button className={classes.addToCart}>Add to cart</Button>
                </div>
              </div>
            </div>
          </div>
          <Text className={classes.relatedText} weight="bold">
            Related items
          </Text>
          {loadingRelated ? <Text>Loading related items...</Text> :
          errorRelated ? <Text>Error while loading related items!</Text> :
          relatedData == undefined ? 
          <Text>Related items list is empty</Text> : <CardList products={relatedData}></CardList>}
        </>
      )}
    </div>
  );
};

export default ProductPage;
