'use client'
import React, {ReactNode, useEffect} from 'react';
import {Flex, useDisclosure} from "@chakra-ui/react";
import DrawerMenu from "@/components/Container/Navbar/NavbarDrawer";
import {BrandSchema} from "@/schemas/data";
import {Item} from "@/components/Container/Navbar/types";
import {ProductCart} from "@/lib/cartFunctions";
import Header from "@/components/Container/Header";
import Footer from "@/components/Container/Footer";
import {useUser} from "@/lib/store/user";
import {User} from "@/lib/store/types";

type Props = {
  children: ReactNode
  brands: BrandSchema[]
  cartProducts: ProductCart[]
  user: User | null
}

const Container = ({children, brands, cartProducts, user}: Props) => {
  const {
    isOpen: isMenuOpen,
    onOpen: onMenuOpen,
    onClose: onMenuClose,
  } = useDisclosure();
  const brandsItems: Item[] = brands.map(brand => (
    {title: brand.name, url: brand.url}
  ))

  const setUser = useUser(
    state => state.setUser
  )

  useEffect(() => {
    if (user)
      setUser(user)
  }, [setUser, user]);

  return (
    <Flex direction='column' minH='100%' mx={[2, 4, 8, 16, 24]}>
      <Header onMenuOpen={onMenuOpen} onMenuClose={onMenuClose} cartProducts={cartProducts}
              brandsItems={brandsItems}/>
      <Flex direction='column' flex={1} backgroundColor='bodyColor' p={[1, 4, 8, 16]} roundedBottom={6}>
        <Flex as='main' flex={1} direction='column'>
          {children}
        </Flex>
      </Flex>
      <Footer isAuthorized={!!user}/>
      <DrawerMenu brandsItems={brandsItems} isOpen={isMenuOpen} onClose={onMenuClose}/>
    </Flex>
  );
};

export default Container;