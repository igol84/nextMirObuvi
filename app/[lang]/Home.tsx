'use client'
import React, {useContext, useState} from 'react';
import Link from "next/link";
import {LangContext} from "@/locale/LangProvider";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {Box, Button, Flex, Link as ChakraLink, Text, useColorMode, VisuallyHidden} from "@chakra-ui/react";
import AirbnbCard from "@/components/demo/BoxDemoi";
import Carousel from "@/components/Carousel";


const Home = () => {
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("serverComponent")
  const {toggleColorMode} = useColorMode()
  const [isSelected, setIsSelected] = useState(false)
  const layerStyle = isSelected ? 'selected' : 'base'
  return (
    <>
      <Flex justifyContent='center' alignItems='center' >
        <Box w={[200, 400, 570]}>
          <Carousel/>
        </Box>
      </Flex>
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
      <Button variant='colorful' onClick={toggleColorMode}>Theme</Button>
      <AirbnbCard/>
      <Button>
        <VisuallyHidden>Checkmark</VisuallyHidden>

      </Button>
    </>
  );
};

export default Home;