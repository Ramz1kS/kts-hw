import React from 'react';
import classes from './NavbarPageMiddleButton.module.scss';
import Text from 'components/Text/';
import classNames from 'classnames';
import type { pageName } from 'types';

type NavbarPageMiddleButtonProps = {
  name: pageName;
  selected: pageName;
  setSelected: (val: pageName | ((prev: pageName) => pageName)) => void;
};

const NavbarPageMiddleButton: React.FC<NavbarPageMiddleButtonProps> = ({
  name,
  selected,
  setSelected,
}) => {
  const finalClassName = classNames({
    [classes.navbarPageButton]: true,
    [classes.navbarPageButtonSelected]: selected == name,
  });
  return (
    <button
      className={finalClassName}
      onClick={() => {
        setSelected(name);
        console.log('peekaboo!');
      }}
    >
      <Text weight={selected == name ? 'bold' : 'normal'} view="p-18">
        {name}
      </Text>
    </button>
  );
};

export default NavbarPageMiddleButton;
