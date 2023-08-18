'use client'

import React from 'react';
import {BrandSchema} from "@/schemas/brands";
import NextImage from "next/image";
import ChakraNextImage from "@/components/base/ChakraNextImage";
import Products from "@/components/Products";
import {ProductProps} from "@/components/Products/types";

type Props = {
  brandData: BrandSchema
  productsData: ProductProps[]
}

const BrandPage = ({brandData, productsData}: Props) => {
  return (
    <>
      <ChakraNextImage
        as={NextImage} shadow='base' borderRadius={[30, 15]} width={249} height={249} alt={brandData.name}
        src={`https://mirobuvi.com.ua/ftp_brands/${brandData.id}.jpg`}
      />
      <Products products={productsData}/>
      <div className='brand' dangerouslySetInnerHTML={{ __html: brandData.desc_ua }} />
    </>


  );
};

export default BrandPage;