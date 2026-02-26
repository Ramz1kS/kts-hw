import React, { useEffect } from 'react';
import classes from './ProductPage.module.scss';
import Text from 'components/Text';
import { Link, useNavigate, useParams } from 'react-router';
import { useAxios } from 'hooks/useAxios';
import apiPaths from 'config/apiRoutes';
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';
import ProductInfo from './components/ProductInfo';
import RelatedItems from './components/RelatedItems';
import type { ListResponse, ProductPageResponse } from 'shared/types/types';

export const ProductPage = () => {
    const { documentId } = useParams();
    const navigate = useNavigate();
    const { data: product, isLoading, isError } = useAxios<ProductPageResponse>(apiPaths.getProductURL(documentId ?? ''));
    const relatedParams = React.useMemo(() => ({
        'pagination[pageSize]': 3,
    }), []);
    const { data: relatedData, isLoading: loadingRelated, isError: errorRelated } = 
    useAxios<ListResponse>(apiPaths.products, relatedParams);

    useEffect(() => {
      if (isError) 
        navigate('/404');
    }, [isError]);

    return (
        <div className={classes.productPage}>
            <Link to={'../'} className={classes.backLink}>
                <ArrowLeftIcon width={32} height={32} color='primary' />
                <Text view="p-20" weight="normal">
                    Назад
                </Text>
            </Link>
            {isLoading ? (
                <Text view="title" weight="medium">
                    Loading...
                </Text>
            ) : (
                <>
                    <ProductInfo
                        title={product?.data.title ?? 'No title'}
                        description={product?.data.description ?? 'No description'}
                        price={product?.data.price ?? 0}
                        imageUrl={product?.data.images[0].formats.large.url ?? ''}
                    />
                    <RelatedItems
                        products={relatedData?.data}
                        isLoading={loadingRelated}
                        isError={errorRelated}
                    />
                </>
            )}
        </div>
    );
};

export default ProductPage;
