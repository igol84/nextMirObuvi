import React from 'react';
import {Box} from "@chakra-ui/react";
import Shoes from "./Shoes";
import {FilterProductType} from "@/app/[lang]/[urlTag]/types";

export type ProductTypeType = {
  selectedType: FilterProductType
  onChangeType: (selected: FilterProductType) => void
}

interface Props {
  productTypeType: ProductTypeType
}

const ProductType = ({productTypeType: {selectedType, onChangeType}}: Props) => {
  const onChangeShoes = (checked: boolean) => {
    onChangeType(checked ? 'shoes' : null)
  }
  return (
    <Box>
      <Shoes isChecked={selectedType === 'shoes'} onChange={onChangeShoes}/>
    </Box>
  );
};

export default ProductType;