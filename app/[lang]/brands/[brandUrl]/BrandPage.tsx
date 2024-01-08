'use client'

import React from 'react';
import Products from "@/components/Products";
import {ProductType} from "@/components/Products/types";
import {BrandProps} from "@/components/Brands/types";
import BreadCrumb from "@/components/base/BreadCrumb";
import ViewedProducts from "@/components/Container/ViewedProducts";
import {Box, Flex, IconButton, useDisclosure} from "@chakra-ui/react";
import {useBrandCrumbs} from "@/app/[lang]/brands/[brandUrl]/hooks";
import SortingSelect from "@/components/base/SortingSelect";
import {SortingType} from "@/components/base/SortingSelect/types";
import {FilterMenuType} from "@/app/[lang]/[urlTag]/types";
import useScroll from "@/lib/store/filters/hooks/useScroll";
import useFilters from "@/lib/store/filters/hooks/useFilters";
import {FaFilter} from "react-icons/fa";
import FilterMenu from "@/components/Container/FilterMenu";
import DrawerMenu from "@/components/Container/FilterMenu/DrawerMenu";
import {useDictionaryTranslate} from "@/dictionaries/hooks";

type Props = {
  brandData: BrandProps
  productsData: ProductType[]
  sortingBy: SortingType
  viewedProducts: ProductType[]
  filterMenuType: FilterMenuType
}

const BrandPage = ({brandData, productsData, sortingBy, viewedProducts, filterMenuType}: Props) => {
  const d = useDictionaryTranslate("filter")
  const {filterMenuPriceType, filterProductType} = filterMenuType
  useScroll()
  const mobileFilterMenu = useDisclosure();
  const {
    priceFilterType,
    productTypeType,
    shoesMenuType
  } = useFilters(filterMenuPriceType, filterProductType, filterMenuType)
  const breadCrumbs = useBrandCrumbs(brandData.brandName, brandData.url)
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
          <Products productsData={productsData} brandData={brandData}/>
        </Box>
      </Flex>
      <div className='desc' dangerouslySetInnerHTML={{__html: brandData.desc}}/>
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

export default BrandPage;