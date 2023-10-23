'use client'
import React from 'react';
import {Box, Flex} from "@chakra-ui/react";
import Carousel from "@/components/Carousel";
import Brands from "@/components/Brands";
import {BrandCardPropsWithFirst} from "@/components/Brands/types";
import {useSearchParams} from 'next/navigation'

type Props = {
  brands: BrandCardPropsWithFirst[]
}

const Home = ({brands}: Props) => {
  const searchParams = useSearchParams()
  const isOrderSuccess = !!searchParams.get('order-success')
  console.log(isOrderSuccess)
  return (
    <>
      <Flex justifyContent='center' alignItems='center' pb={8}>
        <Box w={[200, 400, 570]}>
          <Carousel/>
        </Box>
      </Flex>
      <Brands brands={brands}/>
    </>
  );
};

export default Home;