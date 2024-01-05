import React from 'react';
import {Divider, Flex} from "@chakra-ui/react";
import Sizes, {SizesType} from "@/components/Container/FilterMenu/ShoesMenu/Sizes";
import Gender, {GenderType} from "@/components/Container/FilterMenu/ShoesMenu/Gender";


export type ShoesMenuType = {
  sizesType: SizesType
  genderType: GenderType
}

export interface ShoesMenuProps {
  shoesMenuType: ShoesMenuType
}

const ShoesMenu = ({shoesMenuType}: ShoesMenuProps) => {
  return (
    <Flex gap={3} direction='column'>
      <Gender genderType={shoesMenuType.genderType}/>
      <Divider />
      <Sizes sizesType={shoesMenuType.sizesType}/>
    </Flex>
  )
}

export default ShoesMenu;