import React from 'react';
import Text from 'components/Text';
import classes from './ProductsStatus.module.scss';

type ProductsStatusProps = {
    isLoading: boolean;
    isError: boolean;
    errorCode: string;
    total?: number;
};

const ProductsStatus: React.FC<ProductsStatusProps> = ({ isLoading, isError, errorCode, total }) => {
    return (
        <div className={classes.totalProdsDiv}>
            {isLoading ? (
                <Text className={classes.totalProducts} view="title" weight="medium">
                    Loading...
                </Text>
            ) : isError ? (
                <Text className={classes.totalProducts} view="title" weight="medium">
                    Error loading data. Error code: {errorCode}
                </Text>
            ) : (
                <>
                    <Text className={classes.totalProducts} weight="bold">
                        Total products
                    </Text>
                    <Text view="p-20" weight="bold" color="accent">
                        {total}
                    </Text>
                </>
            )}
        </div>
    );
};

export default ProductsStatus;
