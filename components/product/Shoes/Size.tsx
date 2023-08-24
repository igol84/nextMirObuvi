import React from 'react';
import {Box} from "@chakra-ui/react";
import {SizeType} from "@/components/product/types";


type Props = {
  size: SizeType
  selected: boolean
  onClick: () => void
}

const Size = ({size, selected, onClick}: Props) => {
  const layerStyle = size.inStock ? selected ? 'shoesSizeSelected' : 'shoesSize' : 'shoesSizeEmpty'
  return (
    <Box layerStyle={layerStyle} onClick={onClick}>
      {size.size}
    </Box>
  );
};

export default Size;