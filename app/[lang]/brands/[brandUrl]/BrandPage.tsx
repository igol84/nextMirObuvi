'use client'

import React from 'react';
import Products from "@/components/Products";
import {ProductType} from "@/components/Products/types";
import {BrandProps} from "@/components/Brands/types";
import BreadCrumb, {BreadCrumbData} from "@/components/base/BreadCrumb";
import ViewedProducts from "@/components/Container/ViewedProducts";
import {Box} from "@chakra-ui/react";

type Props = {
  brandData: BrandProps
  productsData: ProductType[]
  breadCrumbData: BreadCrumbData
  viewedProducts: ProductType[]
}

const BrandPage = ({brandData, productsData, breadCrumbData, viewedProducts}: Props) => {
  return (
    <>
      <BreadCrumb data={breadCrumbData}/>
      <Products productsData={productsData} brandData={brandData}/>
      <div className='desc' dangerouslySetInnerHTML={{__html: brandData.desc}}/>
      {viewedProducts.length > 0 && (
        <Box pt={4}><ViewedProducts viewedProducts={viewedProducts}/></Box>
      )}
    </>
  );
};

export default BrandPage;