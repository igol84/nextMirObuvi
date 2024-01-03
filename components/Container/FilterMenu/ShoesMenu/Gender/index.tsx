import React from 'react';
import {FilterGender, FilterGenderType} from "@/app/[lang]/[urlTag]/types";
import {Flex, Text} from "@chakra-ui/react";
import GenderItem from "@/components/Container/FilterMenu/ShoesMenu/Gender/GenderItem";

export type GenderType = {
  filterGenderType: FilterGenderType
  onClick: (gender: FilterGender) => void
}

interface Props {
  genderType: GenderType
  onMobileMenuClose?: () => void
}

const ganders: { gender: FilterGender, label: string }[] = [
  {gender: "men's", label: 'Men'},
  {gender: "women's", label: 'Women'}
]
const Gender = ({genderType: {filterGenderType: {selectedGender}, onClick}}: Props) => {
  return (
    <Flex gap={1}>
      <Text>Gender:</Text>
      {ganders.map(gander => {
        const selected = gander.gender === selectedGender
        return <GenderItem key={gander.gender} gender={gander.gender} label={gander.label} selected={selected}
                           onClick={onClick}/>
      })}
    </Flex>
  )
}

export default Gender;