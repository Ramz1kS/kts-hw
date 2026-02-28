import React from 'react';
import classes from './CardListSkeleton.module.scss';
import { motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import CardSkeleton from 'components/CardListSkeleton/CardSkeleton';

interface CardListSkeletonInterface {
  count?: number;
}

const CardListSkeleton: React.FC<CardListSkeletonInterface> = observer(({ count = 3 }) => {
  return (
    <ul className={classes.productsListFlex}>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <article>
              <CardSkeleton></CardSkeleton>
            </article>
          </motion.li>
        ))}
    </ul>
  );
});

export default CardListSkeleton;
