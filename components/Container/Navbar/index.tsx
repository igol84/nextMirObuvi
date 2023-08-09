import React from 'react';
import {menuItems} from "@/components/Container/Navbar/items";
import './style.css'
import {Box, Flex} from "@chakra-ui/react";
import MenuItems from "@/components/Container/Navbar/MenuItems";
const Navbar = () => {

  return (
    <Box as='nav'>
      <Flex as='ul' className="menus">
        {menuItems.map((menu, index) => {
          const depthLevel = 0;
          return <MenuItems items={menu} key={index} depthLevel={depthLevel}/>;
        })}
      </Flex>
    </Box>
  );
};

export default Navbar;