import React from 'react';
import {Box, Flex, Text} from "@chakra-ui/react";
import Gallery from "@/components/product/Galarey";
import {ShoesType} from "@/components/product/types";

type Props= {
  shoesData: ShoesType
}


const Shoes = ({shoesData}: Props) => {
  const images = shoesData.images
  return (
    <Flex flexDirection={{base: 'column', lg: 'row'}}>
      <Box w={{base: '100%', lg: '50%'}}>
        <Gallery images={images} />
      </Box>
      <Box w={{base: '100%', lg: '50%'}}>
        <Text>sd</Text>
      </Box>
    </Flex>
  );
};

export default Shoes;