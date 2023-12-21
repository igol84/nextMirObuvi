import React from 'react';
import {Box, Button} from "@chakra-ui/react";
import PriceFilter, {PriceFilterType} from "@/components/Container/FilterMenu/PriceFilter";


export interface FilterMenuProps {
  priceFilterType: PriceFilterType
  onSubmit?: ()=> void
}

const FilterMenu = ({priceFilterType, onSubmit}: FilterMenuProps) => {
  return (
    <Box whiteSpace='nowrap' w={270}>
      <PriceFilter priceFilterType={priceFilterType}/>
      {onSubmit && (
        <Button onClick={onSubmit}>Submit</Button>
      )}

    </Box>
  );
};

export default FilterMenu;