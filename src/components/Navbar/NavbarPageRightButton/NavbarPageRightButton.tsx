import React from 'react';
import classes from './NavbarPageRightButton.module.scss';

interface NavbarPageRightButtonProps {
  image: string;
}

export const NavbarPageRightButton: React.FC<NavbarPageRightButtonProps> = ({ image }) => {
  return (
    <button className={classes.navbarPageRightButton}>
      <img src={image}></img>
    </button>
  );
};

export default NavbarPageRightButton;
