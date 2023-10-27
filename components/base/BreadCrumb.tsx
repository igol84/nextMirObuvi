'use client'
import React, {useContext} from 'react';
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink} from "@chakra-ui/react";
import NextLink from "next/link";
import {LangContext} from "@/locale/LangProvider";
import {useDictionaryTranslate} from "@/dictionaries/hooks";
import {Icon} from "@chakra-ui/icons";
import {AiFillHome} from "react-icons/ai";

export interface BreadCrumbData{
  current: 'brands' | 'brand' | 'product'
  brand?: string
  brandUrl?: string
  product?: string
}

interface Props{
  data: BreadCrumbData
}

const BreadCrumb = ({data: {brand, brandUrl, product, current}}: Props) => {
  const lang = useContext(LangContext)
  const d = useDictionaryTranslate("breadcrumb")
  return (
    <Breadcrumb pb={[2, 4]} whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis' >
      <BreadcrumbItem>
        <BreadcrumbLink display='flex' alignItems='center' as={NextLink} href={`/${lang}`}>
          <Icon as={AiFillHome}/>
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage={current === 'brands'}>
        <BreadcrumbLink as={current === 'brands' ? 'a' : NextLink} href={`/${lang}/brands`}>{d('brands')}</BreadcrumbLink>
      </BreadcrumbItem>

      {!!brand && (
        <BreadcrumbItem isCurrentPage={current === 'brand'}>
          <BreadcrumbLink as={current === 'brand' ? 'a' : NextLink} href={`/${lang}/brands/${brandUrl}`}>{brand}</BreadcrumbLink>
        </BreadcrumbItem>
      )}


      {!!product && (
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href='#'>{product}</BreadcrumbLink>
        </BreadcrumbItem>
      )}

    </Breadcrumb>
  );
};

export default BreadCrumb;