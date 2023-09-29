'use client'
import React, {ReactNode, useContext} from 'react';
import Link from "next/link";
import {HiMenu} from "react-icons/hi";
import {Box, Flex, IconButton, useColorMode, useDisclosure} from "@chakra-ui/react";
import styled from '@emotion/styled'
import {MoonIcon, SunIcon} from '@chakra-ui/icons'
import LocaleSwitcher from "@/components/Container/LocaleSwitcher";
import Navbar from "@/components/Container/Navbar";
import DrawerExample from "@/components/Container/Navbar/NavbarDrawer";
import {BrandSchema} from "@/schemas/data";
import {Item} from "@/components/Container/Navbar/types";
import {LangContext} from "@/locale/LangProvider";

type Props = {
  children: ReactNode
  brands: BrandSchema[]
}


const Container = ({children, brands}: Props) => {
  const StickNav = styled(Flex)`
    position: sticky;
    z-index: 10;
    top: 0;
  `
  const {colorMode, toggleColorMode} = useColorMode()
  const ThemeIcon = colorMode === 'dark' ? SunIcon : MoonIcon
  const lang = useContext(LangContext)
  const {
    isOpen: isMenuOpen,
    onOpen: onMenuOpen,
    onClose: onMenuClose,
  } = useDisclosure();
  const brandsItems:Item[] = brands.map(brand=>(
    {title: brand.name, url: brand.url}
  ))
  return (
    <Box h='100%' mx={[2, 4, 8, 16, 24]}>
      <StickNav flexDirection='column' justifyContent='center' alignItems='center'>
        <Flex direction='column' w='full' backgroundColor='bgBodyColor' gap='2' p={0}>
          <Flex pt={4} backgroundColor='bgBodyColor' flexDirection='column'>
            <Flex as='header' flex={1} pt={4} alignItems='center' color='primary' p={2} justifyContent='space-between'
                  roundedTop={16} backgroundColor='bodyColor' boxShadow={'base'}>
              <IconButton onClick={onMenuOpen} fontSize={[28, 36, 48, 56]} display={{base: "inherit", lg: "none"}}
                          icon={<HiMenu/>} aria-label="Toggle Chat History Drawer"
              />
              <Box as={Link} href={`/${lang}`} className="_icon-logo" aria-label="Home page" fontSize={[28, 36, 48, 56]}
                    sx={{transition: 'all 0.3s ease 0s;'}} _hover={{textDecoration: 'none'}}
              />
              <Flex justifyContent='center' alignItems='center' gap={[1, 2, 3, 4]}>
                <Flex as={'a'} display={{base: 'none', lg: 'flex'}} fontSize={[15, 20, 25, 30]}
                      href="tel:+380933375372">
                  (093)33-75-372
                </Flex>

                <IconButton as={'a'} className="link _icon-viber" aria-label='viber icon' fontSize={[20, 25, 30, 35]}
                            href="viber://add?number=380933375372"/>
                <IconButton icon={<ThemeIcon/>} aria-label='Theme Icon' fontSize={[20, 25, 30, 35]}
                            onClick={toggleColorMode}/>
                <LocaleSwitcher/>
              </Flex>
            </Flex>
            <Flex as='nav' px={2} display={{base: "none", lg: "inherit"}} backgroundColor='bodyColor' boxShadow={'base'}>
              <Navbar brandsItems={brandsItems} isMobile={false} onClose={onMenuClose}/>
            </Flex>
          </Flex>
        </Flex>

      </StickNav>
      <Flex justifyContent='center' alignItems='center'>
        <Flex backgroundColor='bodyColor' direction='column' w='full' p={12} roundedBottom={6} gap='2'>
          {children}
        </Flex>
      </Flex>
      <DrawerExample brandsItems={brandsItems}  isOpen={isMenuOpen} onClose={onMenuClose}/>
    </Box>
  );
};

export default Container;