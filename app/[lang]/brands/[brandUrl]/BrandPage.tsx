'use client'

import React from 'react';
import {BrandSchema} from "@/schemas/brands";
import NextImage from "next/image";
import ChakraNextImage from "@/components/base/ChakraNextImage";

type Props = {
  brandData: BrandSchema
}

const BrandPage = ({brandData}: Props) => {
  return (
    <>
      <ChakraNextImage
        as={NextImage} shadow='base' borderRadius={[30, 15]} width={249} height={249} alt={brandData.name}
        src={`https://mirobuvi.com.ua/ftp_brands/${brandData.id}.jpg`}
      />

      <div className='brand' dangerouslySetInnerHTML={{ __html: brandData.desc_ua }} />
    </>


  );
};

export default BrandPage;