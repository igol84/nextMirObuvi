import React from 'react';
import {Flex, Text} from "@chakra-ui/react";
import {SimpleProductProps} from "@/components/product/types";
import AddToCartButton from "@/components/product/AddToCartButton";
import Like from "@/components/product/Like";

type Props = {
  productData: SimpleProductProps
}

const SimpleProduct = ({productData}: Props) => {
  const UAHFormat = new Intl.NumberFormat('ru-RU', {style: 'decimal'})
  return (
    <>
      <Text fontSize={36}>
        {productData.name}
      </Text>
      <Flex wrap='wrap' alignItems='center' justifyContent='space-between'>
        <Flex alignItems='baseline' color='price'>
          <Text fontSize={64} fontWeight='bold'>
            {UAHFormat.format(productData.price)}
          </Text>
          <Text fontSize={24}>
            {productData.price_prefix}
          </Text>
        </Flex>
        <Like productUrl={productData.product_key}/>
      </Flex>
      <AddToCartButton productId={productData.product_key}/>
    </>
  );
};

export default SimpleProduct;