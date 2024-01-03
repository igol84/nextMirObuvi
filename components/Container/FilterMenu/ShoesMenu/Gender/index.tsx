import React from 'react';
import {allGenders, FilterGender, FilterGenderType} from "@/app/[lang]/[urlTag]/types";
import {Flex, Text} from "@chakra-ui/react";
import GenderItem from "@/components/Container/FilterMenu/ShoesMenu/Gender/GenderItem";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

export type GenderType = {
  filterGenderType: FilterGenderType
  onClick: (gender: FilterGender) => void
}

interface Props {
  genderType: GenderType
  onMobileMenuClose?: () => void
}

const Gender = ({genderType: {filterGenderType: {selectedGender, genders}, onClick}}: Props) => {
  const d = useDictionaryTranslate("filterGender")
  return (
    <Flex gap={1}>
      <Text>Gender:</Text>
      {allGenders.map(gander => {
        const selected = gander === selectedGender
        if(genders.includes(gander))
        return <GenderItem key={gander} gender={gander} label={d(gander)} selected={selected}
                           onClick={onClick}/>
      })}
    </Flex>
  )
}

export default Gender;