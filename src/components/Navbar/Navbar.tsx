import React from 'react';
import classes from './Navbar.module.scss';
import Logo from 'assets/logo.svg';
import UserLogo from 'assets/user.svg';
import NavbarPageMiddleButton from 'components/Navbar/NavbarPageMiddleButton';
import NavbarPageRightButton from 'components/Navbar/NavbarPageRightButton';
import { navItems } from 'config/navConfig';
import { Link } from 'react-router';
import NavbarCartLink from 'components/Navbar/NavbarCartLink';
import { navigationStore } from 'stores/NavigationStore/NavigationStore';
import { observer } from 'mobx-react-lite';

const Navbar = observer(() => {
  return (
    <nav className={classes.navbar}>
      <Link to="/" onClick={() => navigationStore.setCurrentPage('Products')}>
        <img src={Logo} className={classes.navbar__logo}></img>
      </Link>
      <button className={classes.navbar__burger} onClick={navigationStore.toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div
        className={`${classes.navbar__buttons} ${navigationStore.isMenuOpen ? classes.navbar__buttons_open : ''}`}
      >
        {navItems.map((item) => (
          <NavbarPageMiddleButton
            key={item.name}
            name={item.name}
            path={item.path}
            selected={navigationStore.currentPage}
            setSelected={navigationStore.setCurrentPage}
            onClick={navigationStore.closeMenu}
          />
        ))}
      </div>
      <div className={classes['navbar__buttons-right']}>
        <NavbarCartLink></NavbarCartLink>
        <NavbarPageRightButton image={UserLogo}></NavbarPageRightButton>
      </div>
    </nav>
  );
});

export default Navbar;
