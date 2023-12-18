'use client'
import React, {useEffect} from 'react';
import {Box} from "@chakra-ui/react";
import {useSearchParams} from "next/navigation";
import BreadCrumb, {BreadCrumbData} from "@/components/base/BreadCrumb";
import ViewedProducts from "@/components/Container/ViewedProducts";
import {ProductType} from "@/components/Products/types";
import SortingSelect from "@/components/base/SortingSelect";
import {SortingType} from "@/components/base/SortingSelect/types";

interface Props {
  children?: React.ReactNode
  desc: string
  sortingBy: SortingType
  breadCrumbs: BreadCrumbData[]
  viewedProducts: ProductType[]
}

const TagPage = ({children = undefined, desc, sortingBy, breadCrumbs, viewedProducts}: Props) => {
  const searchParams = useSearchParams()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [searchParams])
  return (
    <Box>
      <Box display='flex' justifyContent='space-between' flexWrap='wrap' alignItems="center" pb={[2, 4]} >
        <BreadCrumb breadCrumbs={breadCrumbs}/>
        <SortingSelect value={sortingBy}/>
      </Box>
      {children}
      <div className='desc' dangerouslySetInnerHTML={{__html: desc}}/>
      {viewedProducts.length > 0 && (
        <Box pt={4}>
          <ViewedProducts viewedProducts={viewedProducts}/>
        </Box>
      )}
    </Box>
  );
};

export default TagPage;