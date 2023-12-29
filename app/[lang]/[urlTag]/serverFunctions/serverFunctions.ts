import 'server-only'

import {BreadCrumbData} from "@/components/base/BreadCrumb";
import {getDictionary, Lang} from "@/dictionaries/get-dictionary";
import {FilterMenuType, FilterProductType, ParentTagForBreadCrumb, TagUrl} from "@/app/[lang]/[urlTag]/types";
import {isShoes, ProductType} from "@/components/Products/types";
import _ from "lodash";
import getFilterMenuPrice from "@/app/[lang]/[urlTag]/serverFunctions/getFilterMenuPrice";
import getFilterSizes from "@/app/[lang]/[urlTag]/serverFunctions/getFilterSizes";
import getFilterProductType from "@/app/[lang]/[urlTag]/serverFunctions/getFilterProductType";

export const isSinglePage = (tagData: TagUrl): boolean => tagData.search === ''

export function getBreadCrumbDataSinglePage(pageName: string): BreadCrumbData[] {
  const breadCrumbs: BreadCrumbData[] = []
  const pageCrumb: BreadCrumbData = {
    label: pageName, href: ''
  }
  breadCrumbs.push(pageCrumb)
  return breadCrumbs
}

type getBreadCrumbData = {
  (
    lang: Lang,
    pageName: string,
    parentTagForBreadCrumb?: ParentTagForBreadCrumb
  ): Promise<BreadCrumbData[]>
}

export const getBreadCrumbData: getBreadCrumbData = async (lang, pageName, parent) => {
  const dict = await getDictionary(lang)
  const breadCrumbs: BreadCrumbData[] = []

  const brandCrumb: BreadCrumbData = {
    label: dict.breadcrumb.products, href: `/${lang}/products`
  }
  breadCrumbs.push(brandCrumb)

  if (parent) {
    const parentCrumb: BreadCrumbData = {
      label: parent.name, href: `/${lang}/${parent.url}`
    }
    breadCrumbs.push(parentCrumb)
  }
  if (pageName !== 'header') {
    const pageCrumb: BreadCrumbData = {
      label: pageName, href: ''
    }
    breadCrumbs.push(pageCrumb)
  }

  return breadCrumbs
}

export const searchProductsByTag = (products: ProductType[], searchValue: string): ProductType[] => {
  return products.filter(product => {
    const searchInTags = _.startCase(product.tags)
    const whatSearchInTags = _.startCase(searchValue)
    return searchInTags.includes(whatSearchInTags)
  })
}

export const searchProducts = (products: ProductType[], searchValue: string): ProductType[] => {
  return products.filter(product => {
    const searchInName = product.name.toLowerCase()
    const searchInTags = product.tags.toLowerCase()
    const whatSearch = searchValue.trim().toLowerCase()
    return searchInName.includes(whatSearch) || searchInTags.includes(whatSearch)
  })
}


type GetFiltersType = {
  (
    products: ProductType[],
    minValue?: number,
    maxValue?: number,
    productType?: string,
    size?: string | string[],
    sizesAllList?: number[]
  ): FilterMenuType
}

export const getFiltersType: GetFiltersType = (products, minValue, maxValue, productType, size, sizesAllList) => {
  const filterMenuPriceType = getFilterMenuPrice(products, minValue, maxValue)
  const filterProductType = getFilterProductType(products, productType)
  const filterSizesType = getFilterSizes(products, size, sizesAllList)
  const filterMenuType: FilterMenuType = {filterMenuPriceType, filterProductType, filterSizesType}
  return filterMenuType
}

export const filterProductsByMinPrice = (products: ProductType[], minPrice: number): ProductType[] => {
  return products.filter(product => {
    return product.price >= minPrice
  })
}

export const filterProductsByMaxPrice = (products: ProductType[], maxPrice: number): ProductType[] => {
  return products.filter(product => {
    return product.price <= maxPrice
  })
}

export const filterProductsByProductType = (products: ProductType[], productType: FilterProductType): ProductType[] => {
  return products.filter(product => {
    return product.type === productType
  })
}

export const filterProductsBySize = (products: ProductType[], sizes: number[]): ProductType[] => {
  return products.filter(product => {
    if (isShoes(product)) {
      for (const size of sizes) {
        if (product.sizes.includes(size))
          return true
      }
      return false
    }
  })
}
