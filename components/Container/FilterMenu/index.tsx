import React from 'react';
import {Box} from "@chakra-ui/react";
import PriceFilter, {PriceFilterType} from "@/components/Container/FilterMenu/PriceFilter";


export interface FilterMenuProps {
  priceFilterType: PriceFilterType
  onMobileMenuClose?: ()=>void
}

const FilterMenu = ({priceFilterType, onMobileMenuClose}: FilterMenuProps) => {
  return (
    <Box whiteSpace='nowrap' w={270}>
      <PriceFilter priceFilterData={priceFilterType} onMobileMenuClose={onMobileMenuClose}/>
    </Box>
  );
};

export default FilterMenu;