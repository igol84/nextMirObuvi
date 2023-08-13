import React from 'react';
import {Item, menuItems} from "@/components/Container/Navbar/items";
import {Box, Flex} from "@chakra-ui/react";
import MenuItems from "@/components/Container/Navbar/MenuItems";
import './style.css'

interface Brand {
  name: string
  title: string
  desc: string
  url: string
  title_ua: string
  id: number
  desc_ua: string
  active: boolean
}

type Props = {
  brands: Brand[]
  isMobile?: boolean
  onClose: () => void
}

const Navbar = ({brands, isMobile, onClose}: Props) => {
  const brandsSub:Item[] = brands.map(brand=>(
    {title: brand.name, url: brand.url}
  ))
  const brandsItems: Item = {title: 'Brands', url: '/', submenu: brandsSub}
  const allBrands = menuItems.concat(brandsItems)
  return (
    <Box as='nav'>
      <Flex as='ul' sx={{listStyle: 'none'}} flexDirection={isMobile ? 'column' : 'row'}>
        {allBrands.map((menu, index) => {
          const depthLevel = 0;
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} isMobile={isMobile} onClose={onClose}/>;
        })}
      </Flex>
    </Box>
  );
};

export default Navbar;