import React from 'react';
import {Box, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Text} from "@chakra-ui/react";
import {usePricePrefix} from "@/lib/hooks";

export type PriceFilterType = {
  minInitial: number
  min: number
  onMinChange: (min: number) => void
  maxInitial: number
  max: number
  onMaxChange: (max: number) => void
}

export interface PriceFilterProps {
  priceFilterType: PriceFilterType
}

const PriceFilter = ({priceFilterType}: PriceFilterProps) => {
  const {minInitial, min, onMinChange, maxInitial, max, onMaxChange} = priceFilterType
  const pricePrefix = usePricePrefix()
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const minPrice = UAHFormat.format(min)
  const maxPrice = UAHFormat.format(max)
  const headerText = `${minPrice}${pricePrefix} - ${maxPrice}${pricePrefix}`

  const onChange = (value: number[]) => {
    onMinChange(value[0])
    onMaxChange(value[1])
  }
  const getAriaValueText = (index: number) => {
    return index === 0 ? 'min' : 'max'
  }
  return (
    <Box>
      <Text>Price: {headerText}</Text>
      <Box>
        <RangeSlider getAriaValueText={getAriaValueText} value={[min, max]} onChange={onChange} min={minInitial}
                     max={maxInitial} step={10}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack/>
          </RangeSliderTrack>
          <RangeSliderThumb index={0}/>
          <RangeSliderThumb index={1}/>
        </RangeSlider>
      </Box>
    </Box>
  );
};

export default PriceFilter;