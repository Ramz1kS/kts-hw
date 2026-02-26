import React from 'react';
import Text from 'components/Text';
import Button from 'components/Button';
import classes from './ProductInfo.module.scss';

type ProductInfoProps = {
    title: string;
    description: string;
    price: number;
    imageUrl: string;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ title, description, price, imageUrl }) => {
    return (
        <div className={classes.productInfo}>
            <img className={classes.prodImage} src={imageUrl} alt={title} />
            <div className={classes.prodRightInfo}>
                <div className={classes.prodNameDesc}>
                    <Text tag="h1" view="title" weight="bold">
                        {title}
                    </Text>
                    <Text color="secondary" view="p-20">
                        {description}
                    </Text>
                </div>
                <div className={classes.costAndButtons}>
                    <Text view="title" weight="bold">
                        {`\$${price}`}
                    </Text>
                    <div className={classes.buttons}>
                        <Button>Buy now</Button>
                        <Button className={classes.addToCart}>Add to cart</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
