import React from 'react';
import {Box} from "@chakra-ui/react";
import PriceFilter, {PriceFilterType} from "@/components/Container/FilterMenu/PriceFilter";
import ProductType, {ProductTypeType} from "@/components/Container/FilterMenu/ProductType";


export interface FilterMenuProps {
  priceFilterType: PriceFilterType
  productTypeType: ProductTypeType
  onMobileMenuClose?: () => void
}

const FilterMenu = ({priceFilterType, productTypeType, onMobileMenuClose}: FilterMenuProps) => {
  return (
    <Box whiteSpace='nowrap' w={240}>
      <PriceFilter priceFilterData={priceFilterType} onMobileMenuClose={onMobileMenuClose}/>
      <ProductType productTypeType={productTypeType}/>
    </Box>
  );
};

export default FilterMenu;