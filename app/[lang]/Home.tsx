'use client'
import React from 'react';
import {Box, Flex} from "@chakra-ui/react";
import Carousel from "@/components/Carousel";
import {Brand} from "@/schemas/brands";
import Brands from "@/components/Brands";


type Props = {
  brands: Brand[]
}

const Home = ({brands}: Props) => {
  return (
    <>
      <Flex justifyContent='center' alignItems='center'>
        <Box w={[200, 400, 570]}>
          <Carousel/>
        </Box>
      </Flex>
      <Brands brands={brands}/>
    </>
  );
};

export default Home;