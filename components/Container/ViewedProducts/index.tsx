import React from 'react';
import {Box, Flex, Heading, WrapItem} from "@chakra-ui/react";
import {ProductType} from "@/components/Products/types";
import {productCardFactory} from "@/components/Products/ProductCardFactory";

interface Props {
  viewedProducts: ProductType[]
}

const ViewedProducts = ({viewedProducts}: Props) => {
  return (
    <Box>
      <Heading as='h3'>До цього ви дивилися</Heading>
      <Flex gap={4} py={4} wrap='wrap'>
        {viewedProducts.map(product => {
          const ProductComponent = productCardFactory(product)
          return (
            <WrapItem as='article' key={product.id}>{ProductComponent}</WrapItem>
          )
        })}
      </Flex>
    </Box>
  );
};

export default ViewedProducts;