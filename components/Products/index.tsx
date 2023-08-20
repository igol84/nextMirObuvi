import React from 'react';
import {ProductProps} from "@/components/Products/types";
import {Center, Text, Wrap, WrapItem} from "@chakra-ui/react";
import ProductCard from "@/components/Products/ProductCard";
import {BrandSchema} from "@/schemas/brands";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import NextImage from "next/image";

type Props = {
  brandData?: BrandSchema
  productsData: ProductProps[]
}

const Products = ({brandData, productsData}: Props) => {
  const brandCard = brandData && (
    <WrapItem flexDirection="column">
      <ChakraNextImage
        as={NextImage} shadow='base' borderRadius={[30, 15]} width={249} height={249} alt={brandData.name}
        src={`https://mirobuvi.com.ua/ftp_brands/${brandData.id}.jpg`}
      />
      <Center width={249}><Text fontSize='2rem'>{brandData.name}</Text></Center>
    </WrapItem>
  )
  return (
    <Wrap justify={{base: 'center', lg: 'flex-start'}} spacing={4}>
      {brandCard}
      {productsData.map(product => {
        return (
          <WrapItem key={product.id}>
            <ProductCard product={product}/>
          </WrapItem>
        )
      })}
    </Wrap>
  );
};

export default Products;