'use client'

import React from 'react';
import Products from "@/components/Products";
import {ProductType} from "@/components/Products/types";
import {BrandProps} from "@/components/Brands/types";
import BreadCrumb from "@/components/base/BreadCrumb";
import ViewedProducts from "@/components/Container/ViewedProducts";
import {Box} from "@chakra-ui/react";
import {useBrandCrumbs} from "@/app/[lang]/brands/[brandUrl]/hooks";

type Props = {
  brandData: BrandProps
  productsData: ProductType[]
  viewedProducts: ProductType[]
}

const BrandPage = ({brandData, productsData, viewedProducts}: Props) => {
  const breadCrumbs = useBrandCrumbs(brandData.brandName, brandData.url)
  return (
    <>
      <BreadCrumb breadCrumbs={breadCrumbs}/>
      <Products productsData={productsData} brandData={brandData}/>
      <div className='desc' dangerouslySetInnerHTML={{__html: brandData.desc}}/>
      {viewedProducts.length > 0 && (
        <Box pt={4}>
          <ViewedProducts viewedProducts={viewedProducts}/>
        </Box>
      )}
    </>
  );
};

export default BrandPage;