import React from 'react';
import {Box, Flex, Text} from "@chakra-ui/react";

type Props = {
  sizes: number[]
}

const Sizes = ({sizes}: Props) => {
  return (
    <Flex gap='4px 8px' wrap='wrap' justifyContent='center'>
      <Text color='green.500'>Размеры:</Text>
      {sizes.map(size =>{
        return (
          <Text>{size}</Text>
        )
      })}
    </Flex>
  );
};

export default Sizes;