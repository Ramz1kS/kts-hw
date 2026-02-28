import React from 'react';
import classes from './Button.module.scss';
import classNames from 'classnames';
import Loader from 'components/Loader';
import { motion } from 'framer-motion';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ loading, children, className, disabled, ...rest }) => {
  const btnClass = classNames(classes.myBtn, className, {
    [classes['myBtn--disabled']]: disabled,
  });
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      <button className={btnClass} disabled={loading || disabled} {...rest}>
        {loading && <Loader size="s" className={classes.myBtn__loader} />}
        <p className={classes.myBtn__text}>{children}</p>
      </button>
    </motion.div>
  );
};

export default Button;
