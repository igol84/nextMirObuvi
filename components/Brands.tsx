'use client'
import React from 'react';
import {Brand} from "@/schemas/brands";
import {Box, Flex, VStack} from "@chakra-ui/react";
import Image from 'next/image'

type Props = {
  brands: Brand[]
}

const Brands = ({brands}: Props) => {
  return (
    <Flex alignItems='center' gap={4} flexWrap='wrap'>
      {brands.map(brand => (
        <VStack key={brand.id}>
          <Box>
            <Image width={200} height={200} alt={brand.name}
              src={`https://mirobuvi.com.ua/ftp_brands/${brand.id}.jpg`}
            />
          </Box>
          <Box>{brand.name}</Box>
        </VStack>
      ))}
    </Flex>
  );
};

export default Brands;