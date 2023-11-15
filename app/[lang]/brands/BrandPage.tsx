'use client'
import React from 'react';
import {BrandCardPropsWithFirst} from "@/components/Brands/types";
import BreadCrumb from "@/components/base/BreadCrumb";
import Brands from "@/components/Brands";
import {Box} from "@chakra-ui/react";
import ViewedProducts from "@/components/Container/ViewedProducts";
import {ProductType} from "@/components/Products/types";

interface Props{
  brands: BrandCardPropsWithFirst[]
  viewedProducts: ProductType[]
}

const BrandPage = ({brands, viewedProducts}: Props) => {
  return (
    <>
      <BreadCrumb data={{current: "brands"}} />
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