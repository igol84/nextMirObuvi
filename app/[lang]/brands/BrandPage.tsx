'use client'
import React from 'react';
import {BrandCardPropsWithFirst} from "@/components/Brands/types";
import BreadCrumb from "@/components/base/BreadCrumb";
import Brands from "@/components/Brands";
import {Box} from "@chakra-ui/react";
import ViewedProducts from "@/components/Container/ViewedProducts";
import {ProductType} from "@/components/Products/types";
import {useBrandCrumbs} from "@/app/[lang]/brands/hooks";

interface Props{
  brands: BrandCardPropsWithFirst[]
  viewedProducts: ProductType[]
}

const BrandPage = ({brands, viewedProducts}: Props) => {
  const breadCrumbs = useBrandCrumbs()
  return (
    <>
      <BreadCrumb breadCrumbs={breadCrumbs}/>
      <Brands brands={brands}/>
      {viewedProducts.length > 0 && (
        <Box pt={4}>
          <ViewedProducts viewedProducts={viewedProducts}/>
        </Box>
      )}
    </>
  );
};

export default BrandPage;