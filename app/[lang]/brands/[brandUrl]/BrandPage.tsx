'use client'

import React from 'react';
import {BrandSchema} from "@/schemas/brands";
import Products from "@/components/Products";
import {ProductProps} from "@/components/Products/types";

type Props = {
  brandData: BrandSchema
  productsData: ProductProps[]
}

const BrandPage = ({brandData, productsData}: Props) => {
  return (
    <>
      <Products productsData={productsData} brandData={brandData}/>
      <div className='brand' dangerouslySetInnerHTML={{__html: brandData.desc}}/>
    </>


  );
};

export default BrandPage;