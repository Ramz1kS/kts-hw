import classNames from 'classnames';
import React, { useRef } from 'react';
import classes from './Card.module.scss';
import Text from 'components/Text';
import NoImageFoundPic from 'assets/no_img_found.png';
import { motion } from 'framer-motion';
import ProductRating from 'components/ProductRating';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image?: string;
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Заголовок карточки */
  title?: React.ReactNode;
  /** Описание карточки */
  subtitle?: React.ReactNode;
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /** Слот для действия */
  actionSlot?: React.ReactNode;
  /** Оценка товара **/
  rating?: number;
  /** Скидка **/
  discountPercent?: number;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
  rating,
}) => {
  const finalClassName = classNames(classes.card, className);
  const imgRef = useRef<HTMLImageElement>(null);
  const onImageNotFound = () => {
    console.log('Image not found');
    if (imgRef.current != null) imgRef.current.src = NoImageFoundPic;
  };
  return (
    <motion.div
      className={finalClassName}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <img
        className={classes.card__image}
        onError={onImageNotFound}
        ref={imgRef}
        src={image == undefined ? NoImageFoundPic : image}
        alt=""
      />
      <div className={classes['card__info-wrapper']}>
        <div className={classes.card__info}>
          {rating !== undefined ? <ProductRating rating={rating}></ProductRating> : null}
          {<p className={classes.card__caption}>{captionSlot}</p>}
          <Text
            tag="p"
            view="p-20"
            weight="medium"
            className={classes.card__title}
            maxLines={2}
            color="primary"
          >
            {title}
          </Text>
          <Text
            tag="p"
            view="p-16"
            className={classes.card__subtitle}
            maxLines={3}
            color="secondary"
          >
            {subtitle}
          </Text>
        </div>
        <div className={classes.card__footer}>
          <div className={classes.card__content}>{contentSlot}</div>
          {actionSlot}
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
