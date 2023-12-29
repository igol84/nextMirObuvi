import React from 'react';
import {Box} from "@chakra-ui/react";
import Shoes from "./Shoes";
import {FilterProductType} from "@/app/[lang]/[urlTag]/types";

export type ProductTypeType = {
  filterProductType: FilterProductType
  onChangeType: (selected: FilterProductType) => void
}

interface Props {
  productTypeType: ProductTypeType
  onMobileMenuClose?: () => void
}

const ProductType = ({productTypeType: {filterProductType, onChangeType}, onMobileMenuClose}: Props) => {
  const onChangeShoes = (checked: boolean) => {

    onChangeType(checked ? 'shoes' : null)
    onMobileMenuClose && onMobileMenuClose()
  }
  return (
    <Box>
      <Shoes isChecked={filterProductType === 'shoes'} onChange={onChangeShoes}/>
    </Box>
  );
};

export default ProductType;