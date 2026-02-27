import React from 'react';
import classes from './Cart.module.scss';
import Text from 'components/Text';
import CardList from 'components/CardList';
import Button from 'components/Button';
import { cartStore } from 'stores/CartStore/CartStore';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';

export const Cart = observer(() => {
    return (
        <motion.div
            className={classes.cartPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Text tag="h1" view="title" weight="bold">
                Shopping Cart
            </Text>
            {cartStore.count === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Text view="p-20" color="secondary">
                        Your cart is empty
                    </Text>
                </motion.div>
            ) : (
                <>
                    <CardList
                        products={cartStore.products}
                        buttonText="Remove"
                        onButtonClick={cartStore.removeProduct}
                    />
                    <motion.div
                        className={classes.total}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Text view="title" weight="bold">
                            Total: ${cartStore.price.toFixed(2)}
                        </Text>
                        <Button>Checkout</Button>
                    </motion.div>
                </>
            )}
        </motion.div>
    );
});

export default Cart;
