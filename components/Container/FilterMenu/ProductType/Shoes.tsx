import React from 'react';
import {Box, Checkbox} from "@chakra-ui/react";

interface Props {
  isChecked: boolean
  onChange:(checked: boolean) => void
}
const Shoes = ({isChecked, onChange}: Props) => {
  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }
  return (
    <Box>
      <Checkbox defaultChecked={isChecked} onChange={onChangeValue}>Shoes</Checkbox>
    </Box>
  );
};

export default Shoes;