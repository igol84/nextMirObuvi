import React from 'react';
import {menuItems} from "@/components/Container/Navbar/items";
import {Box, Flex} from "@chakra-ui/react";
import MenuItems from "@/components/Container/Navbar/MenuItems";
import './style.css'

type Props = {
  isMobile?: boolean
  onClose: () => void
}
const Navbar = ({isMobile, onClose}: Props) => {
  return (
    <Box as='nav'>
      <Flex as='ul' sx={{listStyle: 'none'}} flexDirection={isMobile ? 'column' : 'row'}>
        {menuItems.map((menu, index) => {
          const depthLevel = 0;
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} isMobile={isMobile} onClose={onClose}/>;
        })}
      </Flex>
    </Box>
  );
};

export default Navbar;