import React from 'react';
import {Button, Flex, Text} from "@chakra-ui/react";
import {SimpleProductProps} from "@/components/product/types";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

type Props = {
  productData: SimpleProductProps
}

const SimpleProduct = ({productData}: Props) => {
  const d = useDictionaryTranslate("product")
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  return (
    <>
      <Text fontSize={36}>
        {productData.name}
      </Text>
      <Flex alignItems='baseline' color='price'>
        <Text fontSize={64} fontWeight='bold'>
          {UAHFormat.format(productData.price)}
        </Text>
        <Text fontSize={24}>
          {productData.price_prefix}
        </Text>
      </Flex>
      <Button variant='solid'>{d('buy')}</Button>
    </>
  );
};

export default SimpleProduct;