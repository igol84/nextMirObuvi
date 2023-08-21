'use client'
import React from 'react';
import {Wrap, WrapItem} from "@chakra-ui/react";
import BrandCard from "@/components/Brands/BrandCard";
import {BrandCardProps} from "@/components/Brands/types";


type Props = {
  brands: BrandCardProps[]
}

const Brands = ({brands}: Props) => {
  return (
    <Wrap align='center' justify={{base: 'center', lg: 'flex-start'}} spacing={4}>
      {brands.map(brand => (
        <WrapItem key={brand.brandId}>
          <BrandCard brandId={brand.brandId} brandName={brand.brandName} url={brand.url}/>
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default Brands;