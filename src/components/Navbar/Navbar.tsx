import React, { useState } from 'react'
import classes from './Navbar.module.scss'
import Logo from 'assets/logo.svg'
import BagLogo from 'assets/bag-2.svg'
import UserLogo from 'assets/user.svg'
import NavbarPageMiddleButton from 'components/Navbar/NavbarPageMiddleButton'
import type { pageName } from 'types'
import NavbarPageRightButton from 'components/Navbar/NavbarPageRightButton'

export default function Navbar() {
  const [currSelected, setCurrSelected] = useState<pageName>('Products')
  return (
    <div className={classes.navbar}>
      <img src={Logo} className={classes.logo}></img>
      <div className={classes.navbarButtonsDiv}>
        <NavbarPageMiddleButton selected={currSelected} setSelected={setCurrSelected} name='Products'></NavbarPageMiddleButton>
        <NavbarPageMiddleButton selected={currSelected} setSelected={setCurrSelected} name='Categories'></NavbarPageMiddleButton>
        <NavbarPageMiddleButton selected={currSelected} setSelected={setCurrSelected} name='About us'></NavbarPageMiddleButton>
      </div>
      <div className={classes.navbarButtonsRightDiv}>
        <NavbarPageRightButton image={BagLogo}></NavbarPageRightButton>
        <NavbarPageRightButton image={UserLogo}></NavbarPageRightButton>
      </div>
    </div>
  )
}
