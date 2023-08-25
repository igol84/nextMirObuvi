'use client'

import React from 'react';
import Products from "@/components/Products";
import {ProductType} from "@/components/Products/types";
import {BrandProps} from "@/components/Brands/types";

type Props = {
  brandData: BrandProps
  productsData: ProductType[]
}

const BrandPage = ({brandData, productsData}: Props) => {
  return (
    <>
      <Products productsData={productsData} brandData={brandData}/>
      <div className='desc' dangerouslySetInnerHTML={{__html: brandData.desc}}/>
    </>
  );
};

export default BrandPage;