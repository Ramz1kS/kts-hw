import React from 'react';
import classes from './CardSkeleton.module.scss';
import Text from 'components/Text';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';

const CardSkeleton: React.FC = () => {
  return (
    <motion.div
      className={classes.card}
    >
      <Skeleton className={classes.cardSkeleton}></Skeleton>
      <div className={classes.cardInfoAndBuy}>
        <div className={classes.cardInfo}>
          <p className={classes.cardCaption}>{<Skeleton count={1} width={100}></Skeleton>}</p>
          <Text
            tag="p"
            view="p-20"
            weight="medium"
            className={classes.cardTitle}
            maxLines={2}
            color="primary"
          >
            <Skeleton width={200}></Skeleton>
          </Text>
          <Text tag="p" view="p-16" className={classes.cardSubtitle} maxLines={3} color="secondary">
            <Skeleton width={300} count={3}></Skeleton>
          </Text>
        </div>
        <div className={classes.cardFooter}>
          <p className={classes.cardContent}>{<Skeleton count={1} width={60}></Skeleton>}</p>
          <Skeleton className={classes.buttonSkeleton}></Skeleton>
        </div>
      </div>
    </motion.div>
  );
};

export default CardSkeleton;
