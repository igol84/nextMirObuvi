import React from 'react';
import {Item, menuItems} from "@/components/Container/Navbar/items";
import {Box, Flex} from "@chakra-ui/react";
import MenuItems from "@/components/Container/Navbar/MenuItems";
import './style.css'

type Props = {
  brandsItems: Item[]
  isMobile?: boolean
  onClose: () => void
}

const Navbar = ({brandsItems, isMobile, onClose}: Props) => {
  const brandsNav: Item = {title: 'Brands', url: '/brands', submenu: brandsItems}
  const allItems = menuItems.concat(brandsNav)
  return (
    <Box as='nav'>
      <Flex as='ul' sx={{listStyle: 'none'}} flexDirection={isMobile ? 'column' : 'row'}>
        {allItems.map((menu, index) => {
          const depthLevel = 0;
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} isMobile={isMobile} onClose={onClose}/>;
        })}
      </Flex>
    </Box>
  );
};

export default Navbar;