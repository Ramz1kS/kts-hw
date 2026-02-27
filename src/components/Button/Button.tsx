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
  const btnClass = classNames(classes.myBtn, className);
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <button className={btnClass} disabled={loading || disabled} {...rest}>
        {loading && <Loader size="s" className={classes.load} />}
        <p className={classes.textButton}>{children}</p>
      </button>
    </motion.div>
  );
};

export default Button;
