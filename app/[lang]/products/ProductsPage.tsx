'use client'
import React from 'react';
import ProductsList from "@/components/base/productsList";
import {PaginationBarProps} from "@/components/base/PaginationBar";
import {ProductType} from "@/components/Products/types";
import {Box} from "@chakra-ui/react";
import ViewedProducts from "@/components/Container/ViewedProducts";
import BreadCrumb from "@/components/base/BreadCrumb";
import {useBrandCrumbs} from "@/app/[lang]/products/hooks";


interface Props {
  products: ProductType[]
  paginationBar: PaginationBarProps
  viewedProducts: ProductType[]
}

const ProductsPage = ({products, paginationBar, viewedProducts}: Props) => {
  const breadCrumbs = useBrandCrumbs()
  return (
    <>
      <BreadCrumb breadCrumbs={breadCrumbs}/>
      <ProductsList products={products} paginationBar={paginationBar}/>
      {viewedProducts.length > 0 && (
        <Box pt={4}>
          <ViewedProducts viewedProducts={viewedProducts}/>
        </Box>
      )}
    </>
  );
};

export default ProductsPage;