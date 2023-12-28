'use client'
import React from 'react';
import {Box, Flex, IconButton, useDisclosure} from "@chakra-ui/react";
import BreadCrumb, {BreadCrumbData} from "@/components/base/BreadCrumb";
import ViewedProducts from "@/components/Container/ViewedProducts";
import {ProductType} from "@/components/Products/types";
import SortingSelect from "@/components/base/SortingSelect";
import {SortingType} from "@/components/base/SortingSelect/types";
import FilterMenu from "@/components/Container/FilterMenu";
import {FaFilter} from "react-icons/fa";
import DrawerMenu from "@/components/Container/FilterMenu/DrawerMenu";
import {FilterMenuType} from "@/app/[lang]/[urlTag]/types";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import useScroll from "@/app/[lang]/[urlTag]/hooks/useScroll";
import useFilters from "@/app/[lang]/[urlTag]/hooks/useFilters";


interface Props {
  children?: React.ReactNode
  desc: string
  sortingBy: SortingType
  breadCrumbs: BreadCrumbData[]
  viewedProducts: ProductType[]
  filterMenuType: FilterMenuType
}

const TagPage = ({children = undefined, desc, sortingBy, breadCrumbs, viewedProducts, filterMenuType}: Props) => {
  useScroll()

  const mobileFilterMenu = useDisclosure();
  const {filterMenuPriceType, filterProductType} = filterMenuType
  const {
    priceFilterType,
    productTypeType,
    shoesMenuType
  } = useFilters(filterMenuPriceType, filterProductType, filterMenuType)
  const d = useDictionaryTranslate("filter")
  return (
    <Box>
      <Flex justifyContent='space-between' flexWrap='wrap' alignItems="center" pb={[2, 4]}>
        <BreadCrumb breadCrumbs={breadCrumbs}/>
        <Flex justifyContent='space-between' flexWrap='wrap' alignItems="center">
          <SortingSelect value={sortingBy}/>
          <IconButton display={{base: "inherit", lg: "none"}} aria-label={d('openFilterMenu')} icon={<FaFilter/>}
                      onClick={mobileFilterMenu.onOpen} isRound={true}
          />
        </Flex>
      </Flex>
      <Flex gap={5}>
        <Box display={{base: "none", lg: "inline"}}>
          <FilterMenu priceFilterType={priceFilterType} productTypeType={productTypeType}
                      shoesMenuType={shoesMenuType}/>
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
      <DrawerMenu isOpen={mobileFilterMenu.isOpen} onClose={mobileFilterMenu.onClose}>
        <FilterMenu priceFilterType={priceFilterType} productTypeType={productTypeType} shoesMenuType={shoesMenuType}
                    onMobileMenuClose={mobileFilterMenu.onClose}/>
      </DrawerMenu>
    </Box>
  );
};

export default TagPage;