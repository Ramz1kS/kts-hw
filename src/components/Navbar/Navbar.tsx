import React, { useState } from 'react'
import classes from './Navbar.module.scss'
import Logo from 'assets/logo.svg'
import BagLogo from 'assets/bag-2.svg'
import UserLogo from 'assets/user.svg'
import NavbarPageMiddleButton from 'components/Navbar/NavbarPageMiddleButton'
import type { pageName } from 'shared/types/types'
import NavbarPageRightButton from 'components/Navbar/NavbarPageRightButton'
import { navItems } from 'config/navConfig'
import { Link } from 'react-router'

export default function Navbar() {
    const [currSelected, setCurrSelected] = useState<pageName>('Products')
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className={classes.navbar}>
            <Link to='/' onClick={() => setCurrSelected('Products')}>
                <img src={Logo} className={classes.logo}></img>
            </Link>
            <button className={classes.burgerButton} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div className={`${classes.navbarButtonsDiv} ${isMenuOpen ? classes.open : ''}`}>
                {navItems.map((item) => (
                    <NavbarPageMiddleButton
                        key={item.name}
                        name={item.name}
                        path={item.path}
                        selected={currSelected}
                        setSelected={setCurrSelected}
                        onClick={() => setIsMenuOpen(false)}
                    />
                ))}
            </div>
            <div className={classes.navbarButtonsRightDiv}>
                <NavbarPageRightButton image={BagLogo}></NavbarPageRightButton>
                <NavbarPageRightButton image={UserLogo}></NavbarPageRightButton>
            </div>
        </nav>
    )
}
