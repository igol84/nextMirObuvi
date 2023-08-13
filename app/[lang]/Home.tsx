'use client'
import React from 'react';
import {Box, Flex, VStack} from "@chakra-ui/react";
import Carousel from "@/components/Carousel";
interface Brand {
  name: string
  title: string
  desc: string
  url: string
  title_ua: string
  id: number
  desc_ua: string
  active: boolean
}

type Props = {
  brands: Brand[]
}

const Home = ({brands} : Props) => {
  return (
    <>
      <Flex justifyContent='center' alignItems='center'>
        <Box w={[200, 400, 570]}>
          <Carousel/>
        </Box>
      </Flex>
      <Flex  alignItems='center' gap={4} flexWrap='wrap'>
          {brands.map(brand=>(
            <VStack key={brand.id}>
              <Box><img alt={brand.name} src={`https://mirobuvi.com.ua/ftp_brands/${brand.id}.jpg`} /></Box>
              <Box>{brand.name}</Box>
            </VStack>
          ))}
      </Flex>
    </>
  );
};

export default Home;