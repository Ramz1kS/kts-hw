import React from 'react';
import classes from './PaginatorArrowButton.module.scss';
import classNames from 'classnames';
import ArrowIcon from 'assets/arrow-left.svg';

interface PaginatorArrowButtonProps {
  currNum: number;
  setCurrent: (val: number | ((val: number) => number)) => void;
  total: number;
  type: 'forward' | 'backward';
}

const PaginatorArrowButton: React.FC<PaginatorArrowButtonProps> = ({
  currNum,
  setCurrent,
  total,
  type,
}) => {
  const finalClassName = classNames({
    [classes['forward']]: type == 'forward',
    [classes['disabled']]: type == 'forward' ? currNum == total : currNum == 1,
  });
  return (
    <button
      className={classes.arrowButton}
      onClick={() =>
        setCurrent((prev) => {
          let bruh = prev;
          if (type == 'backward')
            bruh--
          else 
            bruh++;
          if (bruh == 0) 
            bruh = 1;
          else if (bruh > total) 
            bruh = total;
          return bruh;
        })
      }
    >
      <img className={finalClassName} src={ArrowIcon}></img>
    </button>
  );
};

export default PaginatorArrowButton;
