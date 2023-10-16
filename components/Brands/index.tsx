'use client'
import React from 'react';
import {Wrap, WrapItem} from "@chakra-ui/react";
import BrandCard from "@/components/Brands/BrandCard";
import {BrandCardPropsWithFirst} from "@/components/Brands/types";


type Props = {
  brands: BrandCardPropsWithFirst[]
}

const Brands = ({brands}: Props) => {
  return (
    <Wrap align='center' justify={{base: 'center', lg: 'flex-start'}} spacing={4}>
      {brands.map(brand => (
        <WrapItem as='article' key={brand.brandId}>
          <BrandCard isFirst={brand.isFirst} brandId={brand.brandId} brandName={brand.brandName} url={brand.url}/>
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default Brands;