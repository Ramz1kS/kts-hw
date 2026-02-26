import React from 'react';
import classes from './Button.module.scss';
import classNames from 'classnames';
import Loader from 'components/Loader';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ loading, children, className, disabled, ...rest }) => {
  const btnClass = classNames(classes.myBtn, className);
  return (
    <button className={btnClass} disabled={loading || disabled} {...rest}>
      {loading && <Loader size="s" className={classes.load} />}
      <p className={classes.textButton}>{children}</p>
    </button>
  );
};

export default Button;
