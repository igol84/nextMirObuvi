'use client'
import React from 'react';
import {Box, Flex} from "@chakra-ui/react";
import Carousel from "@/components/Carousel";
import Brands from "@/components/Brands";
import {useBrands} from "@/app/[lang]/hooks";


const Home = () => {
  const {brands} = useBrands()
  const requiredData = brands && brands.map(brand => ({brandId: brand.id, brandName: brand.name, url: brand.url}))
  return (
    <>
      <Flex justifyContent='center' alignItems='center' pb={8}>
        <Box w={[200, 400, 570]}>
          <Carousel/>
        </Box>
      </Flex>
      {requiredData && <Brands brands={requiredData}/>}
    </>
  );
};

export default Home;