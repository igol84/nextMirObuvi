'use client'
import React from 'react';
import {Box, Flex} from "@chakra-ui/react";
import Carousel from "@/components/Carousel";


const Home = () => {
  return (
    <>
      <Flex justifyContent='center' alignItems='center'>
        <Box w={[200, 400, 570]}>
          <Carousel/>
        </Box>
      </Flex>

    </>
  );
};

export default Home;