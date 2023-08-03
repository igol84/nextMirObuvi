'use client'
import React, {useContext, useState} from 'react';
import LocaleSwitcher from "@/components/LocaleSwitcher";
import Link from "next/link";
import {LangContext} from "@/locale/LangProvider";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {Box, Button, Heading, Link as ChakraLink, Text, useColorMode} from "@chakra-ui/react";

const Home = () => {
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("serverComponent")
  const {toggleColorMode} = useColorMode()
  const [isSelected, setIsSelected] = useState(false)
  const layerStyle = isSelected ? 'selected' : 'base'
  return (
    <>
      <LocaleSwitcher/>
      <Heading>asd</Heading>
      <ChakraLink as={Link} href={`/${lang}/second-page`}>
        {d('secondPage')}
      </ChakraLink>
      <Text color='brand.700'>
        will be gray.900 in light mode and gray.50 in dark mode
      </Text>
      <Box
        height={{
          base: '100%', // 0-48em
          md: '50%', // 48em-80em,
          xl: '25%', // 80em+
        }}
        bg='teal.400'
        width={[
          '100%', // 0-30em
          '50%', // 30em-48em
          '25%', // 48em-62em
          '15%', // 62em+
        ]}
      />
      <Box layerStyle={layerStyle}>This is a box</Box>
      <Button onClick={()=>setIsSelected(!isSelected)}>layer Style</Button>
      <Button colorScheme='lime' onClick={toggleColorMode}>Theme</Button>
      <Button size='xl' variant='my'>
        Welcome
      </Button>
    </>
  );
};

export default Home;