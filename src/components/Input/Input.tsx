import React from 'react';
import classes from './Input.module.scss';
import classNames from 'classnames';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
  placeholder?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className, placeholder = 'Text', ...rest }, ref) => {
    return (
      <>
        <input
          ref={ref}
          value={value}
          type="text"
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={classNames(classes.myInput, className)}
          {...rest}
        />
        {afterSlot && <div className={classes.afterSlotWrapper}>{afterSlot}</div>}
      </>
    );
  }
);

export default Input;
