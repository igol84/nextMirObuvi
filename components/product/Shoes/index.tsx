import React, {useState} from 'react';
import {Box, Flex, Text} from "@chakra-ui/react";
import {ShoesType} from "@/components/product/types";
import Size from "@/components/product/Shoes/Size";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import AddToCartButton from "@/components/product/AddToCartButton";

type Props = {
  shoesData: ShoesType
}

const Shoes = ({shoesData}: Props) => {
  const ds = useDictionaryTranslate("shoes")
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [sizeDesc, setSizeDesc] = useState<string>(ds('select_size'))
  const textLength = ds('insole_length')
  const textSelect = ds('select_size')

  const changeLengthText = (length: number | null) => {
    const lengthText = length ? `${textLength} ${length}cm` : ''
    setSizeDesc(lengthText)
  }
  const onClickSize = (size: number, length: number | null) => {
    setSelectedSize(size)
    changeLengthText(length)
  }
  const onHoverSize = (hoveredSize: number) => {
    const sizeData = shoesData.sizes.find(size => size.size === hoveredSize)
    if (sizeData && sizeData.length)
      changeLengthText(sizeData.length)
  }
  const onLiveSize = () => {
    if (selectedSize) {
      const sizeData = shoesData.sizes.find(size => size.size === selectedSize)
      if (sizeData)
        changeLengthText(sizeData.length)
    } else
      setSizeDesc(textSelect)
  }
  return (
    <>
      <Text fontSize={36}>
        {shoesData.name}
      </Text>
      <Flex alignItems='baseline' color='price'>
        <Text fontSize={64} fontWeight='bold'>
          {UAHFormat.format(shoesData.price)}
        </Text>
        <Text fontSize={24}>
          {shoesData.price_prefix}
        </Text>
      </Flex>
      <Flex gap={2} alignItems='center' wrap='wrap' pb={4}>
        <Text>{ds('sizes')}</Text>
        {shoesData.sizes.map(sizeData => {
            const selected = selectedSize === sizeData.size
            return (
              <Size
                key={sizeData.size} sizeData={sizeData} selected={selected} onClickSize={onClickSize}
                onHoverSize={onHoverSize} onLiveSize={onLiveSize}
              />
            )
          }
        )}
      </Flex>
      <Box color='secondary' h={8}>
        {sizeDesc}
      </Box>
      <AddToCartButton productId={shoesData.product_key} size={selectedSize}/>
    </>
  );
};

export default Shoes;