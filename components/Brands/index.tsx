'use client'
import React from 'react';
import {Wrap, WrapItem} from "@chakra-ui/react";
import Brand from "@/components/Brands/Brand";
import {BrandProps} from "@/components/Brands/types";


type Props = {
  brands: BrandProps[]
}

const Brands = ({brands}: Props) => {
  return (
    <Wrap align='center' justify={{base: 'center', lg: 'flex-start'}} spacing={4}>
      {brands.map(brand => (
        <WrapItem key={brand.brandId}>
          <Brand brandId={brand.brandId} brandName={brand.brandName} url={brand.url}/>
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default Brands;