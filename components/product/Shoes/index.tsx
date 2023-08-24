import React, {useState} from 'react';
import {Box, Flex, Text} from "@chakra-ui/react";
import Gallery from "@/components/product/Galarey";
import {ShoesType} from "@/components/product/types";
import Size from "@/components/product/Shoes/Size";

type Props = {
  shoesData: ShoesType
}

const Shoes = ({shoesData}: Props) => {
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const {images} = shoesData
  let UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  return (
    <Flex flexDirection={{base: 'column', lg: 'row'}}>
      <Box w={{base: '100%', lg: '48%'}}>
        <Gallery images={images}/>
      </Box>
      <Box w={{base: '100%', lg: '50%'}}>
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
        <Flex gap={2} alignItems='center' wrap='wrap'>
          <Text>Размеры:</Text>
          {
            shoesData.sizes.map(size => {
                const selected = selectedSize === size.size
                const onClick = () => setSelectedSize(size.size)
                return <Size key={size.size} size={size} selected={selected} onClick={onClick}/>
              }
            )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Shoes;