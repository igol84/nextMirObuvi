import React from 'react';
import {Link} from "@chakra-ui/react";
import {FilterGender} from "@/app/[lang]/[urlTag]/types";


interface Props {
  gender: FilterGender
  label: string
  selected: boolean
  onClick: (gender: FilterGender) => void
}

const GenderItem = ({gender, selected, label, onClick}: Props) => {
  const color = selected ? 'primary.300' : undefined
  const onClickGender = () => {
    onClick(gender)
  }
  return (
    <Link color={color} onClick={onClickGender} >{label}</Link>
  );
};

export default GenderItem;