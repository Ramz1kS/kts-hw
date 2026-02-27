import React from 'react';
import classes from './ProductRating.module.scss';

interface ProductRatingProps {
  rating: number;
  size?: number;
  gap?: number;
}

const ProductRating: React.FC<ProductRatingProps> = ({ rating, size = 12, gap = 4 }) => {
  return (
    <div
      className={classes.circleContainer}
      style={{
        gap: gap,
      }}
    >
      {Array(rating)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={classes.circleFilled}
            style={{
              width: size,
              height: size,
            }}
          ></div>
        ))}
      {Array(5 - rating)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={classes.circleEmpty}
            style={{
              width: size,
              height: size,
            }}
          ></div>
        ))}
    </div>
  );
};

export default ProductRating;
