import React from 'react';
import {menuItems} from "@/components/Container/Navbar/items";
import {Flex} from "@chakra-ui/react";
import MenuItems from "@/components/Container/Navbar/MenuItems";
import './style.css'
import {Item} from "@/components/Container/Navbar/types";

type Props = {
  brandsItems: Item[]
  isMobile?: boolean
  onClose: () => void
}

const Navbar = ({brandsItems, isMobile, onClose}: Props) => {
  const updatedBrandItems = brandsItems.map(item => {
    const url = `brands/${item.url}`
    return {...item, url}
  })
  const brandsNav: Item = {title: 'Brands', url: '/brands/', submenu: updatedBrandItems}
  const allItems = menuItems.concat(brandsNav)
  return (
    <Flex as='ul' sx={{listStyle: 'none'}} flexDirection={isMobile ? 'column' : 'row'}>
      {allItems.map((menu, index) => {
        const depthLevel = 0;
        return <MenuItems items={menu} key={index} depthLevel={depthLevel} isMobile={isMobile} onClose={onClose}/>;
      })}
    </Flex>
  );
};

export default Navbar;