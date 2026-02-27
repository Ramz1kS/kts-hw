import NavbarPageRightButton from 'components/Navbar/NavbarPageRightButton'
import BagLogo from 'assets/bag-2.svg'
import React from 'react'
import { observer } from 'mobx-react-lite'
import { cartStore } from 'stores/CartStore/CartStore'

const NavbarCartLink = observer(() => {
  return (
    <NavbarPageRightButton to='/cart' count={cartStore.count} image={BagLogo}></NavbarPageRightButton>
  )
})

export default NavbarCartLink
