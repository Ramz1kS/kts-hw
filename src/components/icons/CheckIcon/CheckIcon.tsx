import * as React from 'react';
import Icon, { type IconProps } from '../Icon';
import classes from './ArrowLeftIcon.module.scss';

const CheckIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  className,
  color,
  ...props
}) => {
  return (
    <Icon width={width} height={height} className={className} {...props}>
      <path
        className={color == undefined ? classes.inherit : classes[color]}
        d="M4 11.6129L9.87755 18L20 7"
        strokeWidth={2}
      />
    </Icon>
  );
};

export default CheckIcon;
