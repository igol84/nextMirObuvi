'use client'
import React, {ReactNode} from 'react';
import {Flex, useDisclosure} from "@chakra-ui/react";
import DrawerMenu from "@/components/Container/Navbar/NavbarDrawer";
import {BrandSchema} from "@/schemas/data";
import {Item} from "@/components/Container/Navbar/types";
import {ProductCart} from "@/lib/cartFunctions";
import {Session} from "next-auth";
import Header from "@/components/Container/Herader";
import Footer from "@/components/Container/Footer";

type Props = {
  children: ReactNode
  brands: BrandSchema[]
  cartProducts: ProductCart[]
  session: Session | null
}

const Container = ({children, brands, cartProducts, session}: Props) => {


  const {
    isOpen: isMenuOpen,
    onOpen: onMenuOpen,
    onClose: onMenuClose,
  } = useDisclosure();
  const brandsItems: Item[] = brands.map(brand => (
    {title: brand.name, url: brand.url}
  ))

  return (
    <Flex direction='column' minH='100%' mx={[2, 4, 8, 16, 24]}>
      <Header session={session} onMenuOpen={onMenuOpen} onMenuClose={onMenuClose} cartProducts={cartProducts}
              brandsItems={brandsItems}/>
      <Flex direction='column' flex={1} backgroundColor='bodyColor' p={[1, 4, 8, 16]} roundedBottom={6}>
        <Flex as='main' flex={1} direction='column'>
          {children}
        </Flex>
      </Flex>
      <Footer isAuthorized={!!session}/>
      <DrawerMenu brandsItems={brandsItems} isOpen={isMenuOpen} onClose={onMenuClose}/>
    </Flex>
  );
};

export default Container;