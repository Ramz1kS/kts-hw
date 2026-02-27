import React, { useEffect } from 'react';
import classes from './ProductPage.module.scss';
import Text from 'components/Text';
import { Link, useNavigate, useParams } from 'react-router';
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';
import ProductInfo from './components/ProductInfo';
import RelatedItems from './components/RelatedItems';
import { productStore } from 'stores/ProductStore/ProductStore';
import { observer } from 'mobx-react-lite';

export const ProductPage = observer(() => {
  const { documentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (documentId) {
      productStore.loadProduct(documentId);
      productStore.loadRelatedProducts();
    }
  }, [documentId]);

  useEffect(() => {
    if (productStore.isError) {
      navigate(`/error/${productStore.errorCode}`);
    }
  }, [productStore.isError, productStore.errorCode]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [documentId]);

  return (
    <div className={classes.productPage}>
      <Link to={'../'} className={classes.backLink}>
        <ArrowLeftIcon width={32} height={32} color="primary" />
        <Text view="p-20" weight="normal">
          Назад
        </Text>
      </Link>
      <ProductInfo
        title={productStore.product?.title}
        description={productStore.product?.description}
        price={productStore.product?.price}
        imageUrl={productStore.product?.images[0]?.formats.large.url}
        rating={productStore.product?.rating}
      />
      {productStore.isLoadingRelated ? (
        <Text view="title" weight="medium">
          Loading...
        </Text>
      ) : (
        <>
          <RelatedItems />
        </>
      )}
    </div>
  );
});

export default ProductPage;
