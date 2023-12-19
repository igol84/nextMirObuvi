'use client'
import React, {useEffect} from 'react';
import {Box, Flex, IconButton, useDisclosure} from "@chakra-ui/react";
import {useSearchParams} from "next/navigation";
import BreadCrumb, {BreadCrumbData} from "@/components/base/BreadCrumb";
import ViewedProducts from "@/components/Container/ViewedProducts";
import {ProductType} from "@/components/Products/types";
import SortingSelect from "@/components/base/SortingSelect";
import {SortingType} from "@/components/base/SortingSelect/types";
import FilterMenu from "@/components/Container/FilterMenu";
import {FaFilter} from "react-icons/fa";
import DrawerMenu from "@/components/Container/FilterMenu/DrawerMenu";


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
  const filterMenu = useDisclosure();
  return (
    <Box>
      <Flex justifyContent='space-between' flexWrap='wrap' alignItems="center" pb={[2, 4]}>
        <BreadCrumb breadCrumbs={breadCrumbs}/>
        <Flex justifyContent='space-between' flexWrap='wrap' alignItems="center">
          <SortingSelect value={sortingBy}/>
          <IconButton display={{base: "inherit", md: "none"}} aria-label='Toggle Filter Menu' icon={<FaFilter/>}
                      onClick={filterMenu.onToggle} isRound={true}/>
        </Flex>
      </Flex>
      <Flex>
        <Box display={{base: "none", md: "inherit"}}>
          <FilterMenu/>
        </Box>
        <Box>
          {children}
        </Box>
      </Flex>
      <div className='desc' dangerouslySetInnerHTML={{__html: desc}}/>
      {viewedProducts.length > 0 && (
        <Box pt={4}>
          <ViewedProducts viewedProducts={viewedProducts}/>
        </Box>
      )}
      <DrawerMenu isOpen={filterMenu.isOpen} onClose={filterMenu.onClose}>
        <FilterMenu/>
      </DrawerMenu>
    </Box>
  );
};

export default TagPage;