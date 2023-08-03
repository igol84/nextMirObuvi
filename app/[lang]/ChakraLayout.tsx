'use client'
import React, {ReactNode} from 'react';
import {Flex} from "@chakra-ui/react";


const ChakraLayout = ({children}: { children: ReactNode }) => {
  return (
    <Flex height='100vh'  alignItems='center' justifyContent='center'>
      <Flex direction='column' backgroundColor='text' p={12} rounded={6}  gap='2'>
        <h1>Header</h1>
        {children}
      </Flex>
    </Flex>
  );
};

export default ChakraLayout;

