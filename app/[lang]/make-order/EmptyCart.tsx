'use client'
import React from 'react';
import {Box, Heading, Image, useColorMode} from "@chakra-ui/react";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

const EmptyCart = () => {
  const d = useDictionaryTranslate("cart")
  const {colorMode} = useColorMode()
  return (
    <Box>
      <Heading>{d('emptyCart')}</Heading>
      <Image src={colorMode === 'dark' ? '/images/empty-cart-dark.png' : '/images/empty-cart.png'}
             alt={d('emptyCartImg')}/>
    </Box>
  );
};

export default EmptyCart;