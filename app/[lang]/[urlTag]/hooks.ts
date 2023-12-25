import {useEffect, useState} from "react";
import {PriceFilterType} from "@/components/Container/FilterMenu/PriceFilter";
import {FilterMenuPriceType, FilterProductType} from "@/app/[lang]/[urlTag]/types";
import {createUrl} from "@/lib/format";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {ProductTypeType} from "@/components/Container/FilterMenu/ProductType";

type UseFiltersPrice = {
  (
    filterMenuPriceType: FilterMenuPriceType
  ): {
    priceFilterTypeWithoutOnSubmit: Omit<PriceFilterType, 'onSubmit'>,
    onSubmitPrice: (params: URLSearchParams, value: number[]) => void
  }
}

export const useFiltersPrice: UseFiltersPrice = (filterMenuPriceType) => {
  const {minInitial, maxInitial, minValue, maxValue} = filterMenuPriceType
  const maxValueInit = maxValue && maxValue > 0 && maxValue <= maxInitial
    ? maxValue
    : maxInitial
  const minValueInit = minValue
    ? minValue < 0
      ? minInitial
      : minValue <= maxValueInit
        ? minValue
        : maxValueInit
    : minInitial
  const [min, setMin] = useState<number>(minValueInit)
  const [max, setMax] = useState<number>(maxValueInit)
  const onMinChange = (min: number) => {
    setMin(min)
  }
  const onMaxChange = (max: number) => {
    setMax(max)
  }
  const priceFilterTypeWithoutOnSubmit: Omit<PriceFilterType, 'onSubmit'> = {
    minInitial, min, onMinChange, maxInitial, max, onMaxChange
  }
  const minPrice = min === minInitial ? undefined : min
  const maxPrice = max === maxInitial ? undefined : max

  const onSubmitPrice = (params: URLSearchParams, value: number[]) => {
    console.log(value)
    if (minPrice !== undefined) {
      params.set('minPrice', String(minPrice))
    } else {
      params.delete('minPrice')
    }
    if (maxPrice !== undefined) {
      params.set('maxPrice', String(maxPrice))
    } else {
      params.delete('maxPrice')
    }
  }
  return {priceFilterTypeWithoutOnSubmit, onSubmitPrice}
}

type UseFiltersProductType = {
  (
    filterProductType: FilterProductType
  ): {
    filterProductTypeOnSubmit: Omit<ProductTypeType, 'onChangeType'>,
    onSubmitProductType: (selected: FilterProductType) => void
  }
}

export const useFiltersProductType: UseFiltersProductType = (filterProductType) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  let params = new URLSearchParams(searchParams.toString())
  const filterProductTypeOnSubmit: Omit<ProductTypeType, 'onChangeType'> = {selectedType: filterProductType}
  const onSubmitProductType = (selected: FilterProductType) => {
    params.delete('page')
    console.log(selected)
    params.delete('minPrice')
    params.delete('maxPrice')
    if (selected === 'shoes') {
      params.set('productType', String('shoes'))
    } else {
      params.delete('productType')
    }
    const url = createUrl(pathname, params.toString())
    router.push(url)
  }
  return {filterProductTypeOnSubmit, onSubmitProductType}
}


type UseFilters = {
  (
    filterMenuPriceType: FilterMenuPriceType,
    filterProductType: FilterProductType
  ): {
    priceFilterType: PriceFilterType,
    productTypeType: ProductTypeType
  }
}

export const UseFilters: UseFilters = (filterMenuPriceType, filterProductType) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const {priceFilterTypeWithoutOnSubmit, onSubmitPrice} = useFiltersPrice(filterMenuPriceType)
  const {filterProductTypeOnSubmit, onSubmitProductType} = useFiltersProductType(filterProductType)
  let params = new URLSearchParams(searchParams.toString())

  const onSubmit = (onSubmitFilter: (params: URLSearchParams, value: any) => void) => (value: any) => {
    params.delete('page')
    onSubmitFilter(params, value)
    const url = createUrl(pathname, params.toString())
    router.push(url)
  }
  const priceFilterType: PriceFilterType = {...priceFilterTypeWithoutOnSubmit, onSubmit: onSubmit(onSubmitPrice)}
  const productTypeType: ProductTypeType = {...filterProductTypeOnSubmit, onChangeType: onSubmitProductType}
  return {priceFilterType, productTypeType}
}


export const useScroll = () => {
  const searchParams = useSearchParams()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [searchParams])
}