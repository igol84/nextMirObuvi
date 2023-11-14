import React from 'react';
import {ProductType} from "@/components/Products/types";
import {Center, Text, Wrap, WrapItem} from "@chakra-ui/react";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import NextImage from "next/image";
import {BrandProps} from "@/components/Brands/types";
import {productCardFactory} from "@/components/Products/ProductCardFactory";


type Props = {
  brandData?: BrandProps
  productsData: ProductType[]
}


const Products = ({brandData, productsData}: Props) => {
  return (
    <Wrap justify={{base: 'center', lg: 'flex-start'}} spacing={4}>
      {!!brandData && (
        <WrapItem flexDirection="column">
          <ChakraNextImage
            as={NextImage} shadow='base' borderRadius={[30, 15]} width={249} height={249} alt={brandData.brandName}
            src={`https://mirobuvi.com.ua/ftp_brands/${brandData.brandId}.jpg`} priority={true}
          />
          <Center width={249}><Text fontSize='2rem' fontWeight='bold'>{brandData.brandName}</Text></Center>
        </WrapItem>
      )}
      {productsData.map(product => {
        const ProductComponent = productCardFactory(product)
        return (
          <WrapItem as='article' key={product.id}>
            {ProductComponent}
          </WrapItem>
        )
      })}
    </Wrap>
  );
};

export default Products;