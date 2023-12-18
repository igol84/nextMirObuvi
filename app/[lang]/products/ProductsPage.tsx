'use client'
import React from 'react';
import ProductsList from "@/components/base/productsList";
import {PaginationBarProps} from "@/components/base/PaginationBar";
import {ProductType} from "@/components/Products/types";
import {Box} from "@chakra-ui/react";
import ViewedProducts from "@/components/Container/ViewedProducts";
import BreadCrumb from "@/components/base/BreadCrumb";
import {useBrandCrumbs} from "@/app/[lang]/products/hooks";
import SortingSelect from "../../../components/base/SortingSelect";
import {SortingType} from "@/components/base/SortingSelect/types";


interface Props {
  products: ProductType[]
  sortingBy: SortingType
  paginationBar: PaginationBarProps
  viewedProducts: ProductType[]
}

const ProductsPage = ({products, sortingBy, paginationBar, viewedProducts}: Props) => {
  const breadCrumbs = useBrandCrumbs()
  return (
    <>
      <Box display='flex' justifyContent='space-between' flexWrap='wrap' alignItems="center" pb={[2, 4]} >
        <BreadCrumb breadCrumbs={breadCrumbs}/>
        <SortingSelect value={sortingBy}/>
      </Box>
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