import React from 'react';
import {Box} from "@chakra-ui/react";
import Sizes, {SizesType} from "@/components/Container/FilterMenu/ShoesMenu/Sizes";


export type ShoesMenuType = {
  sizesType: SizesType

}

export interface ShoesMenuProps {
  shoesMenuType: ShoesMenuType
}

const ShoesMenu = ({shoesMenuType}: ShoesMenuProps) => {
  return (
    <Box>
      <Sizes sizesType={shoesMenuType.sizesType}/>
    </Box>
  )
}

export default ShoesMenu;