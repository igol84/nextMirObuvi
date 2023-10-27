'use client'

import React from 'react';
import Products from "@/components/Products";
import {ProductType} from "@/components/Products/types";
import {BrandProps} from "@/components/Brands/types";
import BreadCrumb, {BreadCrumbData} from "@/components/base/BreadCrumb";

type Props = {
  brandData: BrandProps
  productsData: ProductType[]
  breadCrumbData: BreadCrumbData
}

const BrandPage = ({brandData, productsData, breadCrumbData}: Props) => {
  return (
    <>
      <BreadCrumb data={breadCrumbData} />
      <Products productsData={productsData} brandData={brandData}/>
      <div className='desc' dangerouslySetInnerHTML={{__html: brandData.desc}}/>
    </>
  );
};

export default BrandPage;