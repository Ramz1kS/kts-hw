import React from 'react';
import classes from './NavbarPageRightButton.module.scss';
import { Link } from 'react-router';

interface NavbarPageRightButtonProps {
  image: string;
  to?: string;
  count?: number;
}

export const NavbarPageRightButton: React.FC<NavbarPageRightButtonProps> = ({
  image,
  to,
  count = -1,
}) => {
  return (
    <Link className={classes.navbarPageRightLink} to={to ?? ''}>
      <img src={image}></img>
      {count > 0 ? (
        <div className={classes.numberContainer}>{count < 10 ? count : '9+'}</div>
      ) : null}
    </Link>
  );
};

export default NavbarPageRightButton;
