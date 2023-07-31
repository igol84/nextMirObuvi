'use client'
import React from 'react';
import {Flex, HStack} from "@chakra-ui/react";
import Navigation from "@/components/demo/components/Navigation";

const FirstDemo = () => {
  return (
    <HStack h='100vh' spacing={0}>
      <Flex as='nav' h='full' maxW={16} w='full' bg='gray.100'>
        <Navigation/>
      </Flex>
      <Flex as='aside' h='full' maxW='sm' w='full' borderRightColor='gray.100' borderRightWidth={1}>
      </Flex>
      <Flex as='main' h='full' flex={1} borderRightColor='gray.100' borderRightWidth={1}>
      </Flex>
      <Flex as='aside' h='full' maxW='sm' w='full'></Flex>
    </HStack>
  );
};

export default FirstDemo;