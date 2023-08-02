'use client'
import React, {ReactNode} from 'react';
import {Flex, useColorModeValue} from "@chakra-ui/react";

const ChakraLayout = ({children}: { children: ReactNode }) => {
  const formBackground = useColorModeValue('gray.100', 'gray.700')
  return (
    <Flex height='100vh' alignItems='center' justifyContent='center' >
      <Flex direction='column' backgroundColor={formBackground}  p={12} rounded={6}>
        <h1>Header</h1>
        {children}
      </Flex>
    </Flex>
  );
};

export default ChakraLayout;