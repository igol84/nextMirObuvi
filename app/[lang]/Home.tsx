'use client'
import React from 'react';
import {Box, Flex} from "@chakra-ui/react";
import Brands from "@/components/Brands";
import {BrandCardProps} from "@/components/Brands/types";


type Props = {
  brands: BrandCardProps[]
}

const Home = ({brands}: Props) => {

  return (
    <>
      <Flex justifyContent='center' alignItems='center' pb={8}>
        <Box w={[200, 400, 570]}>

        </Box>
      </Flex>
      <Brands brands={brands}/>
    </>
  );
};

export default Home;