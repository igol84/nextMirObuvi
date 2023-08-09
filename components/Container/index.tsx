'use client'
import React, {ReactNode} from 'react';
import styled from '@emotion/styled'
import {Box, Flex, IconButton, Link, Link as NextLink, useColorMode} from "@chakra-ui/react";
import {MoonIcon, SunIcon} from '@chakra-ui/icons'
import LocaleSwitcher from "@/components/Container/LocaleSwitcher";
import Navbar from "@/components/Container/Navbar";


const Container = ({children}: { children: ReactNode }) => {
  const StickNav = styled(Flex)`
    position: sticky;
    z-index: 10;
    top: 0;
  `
  const {colorMode, toggleColorMode} = useColorMode()
  const ThemeIcon = colorMode === 'dark' ? SunIcon : MoonIcon
  return (
    <Box h='100%'>
      <StickNav flexDirection='column' justifyContent='center' alignItems='center'>
        <Flex direction='column' w={[300, 500, 700, 950, 1800]} backgroundColor='bgBodyColor' gap='2' p={0}>
          <Flex pt={4} backgroundColor='bgBodyColor' flexDirection='column'>
            <Flex flex={1} pt={4} alignItems='center' color='primary' p={2} justifyContent='space-between'
                  roundedTop={16} backgroundColor='bodyColor' boxShadow={'base'}>
              <Link as={NextLink} href={'/'} className="_icon-logo" aria-label="Home page" fontSize={[28, 36, 48, 56]}
                    sx={{transition: 'all 0.3s ease 0s;'}} _hover={{textDecoration: 'none'}}
              />
              <Flex justifyContent='center' alignItems='center' gap={[1, 2, 3, 4]}>

                <Flex as={'a'} display={['none', 'flex', 'flex', 'flex']} fontSize={[15, 20, 25, 30]}
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
            <Flex px={2} backgroundColor='bodyColor' boxShadow={'base'}>
              <Navbar/>
            </Flex>
          </Flex>
        </Flex>

      </StickNav>
      <Flex justifyContent='center' alignItems='center'>
        <Flex backgroundColor='bodyColor' direction='column' w={[300, 500, 700, 950, 1800]} p={12} roundedBottom={6}
              gap='2'>
          {children}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Container;