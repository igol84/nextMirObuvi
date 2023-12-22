import {useEffect, useState} from "react";
import {PriceFilterType} from "@/components/Container/FilterMenu/PriceFilter";
import {FilterMenuPriceType} from "@/app/[lang]/[urlTag]/types";
import {createUrl} from "@/lib/format";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

type UseFiltersPrice = {
  (
    filterMenuPriceType: FilterMenuPriceType
  ): {
    priceFilterTypeWithoutOnSubmit: Omit<PriceFilterType, 'onSubmit'>,
    onSubmitPrice: (params: URLSearchParams) => void
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
  const priceFilterTypeWithoutOnSubmit: Omit<PriceFilterType, 'onSubmit'>  = {
    minInitial, min, onMinChange, maxInitial, max, onMaxChange
  }
  const minPrice = min === minInitial ? undefined : min
  const maxPrice = max === maxInitial ? undefined : max

  const onSubmitPrice = (params: URLSearchParams) => {
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


type UseFilters = {
  (
    filterMenuPriceType: FilterMenuPriceType
  ): {
    priceFilterType: PriceFilterType,
  }
}

export const UseFilters: UseFilters = (filterMenuPriceType) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const {priceFilterTypeWithoutOnSubmit, onSubmitPrice} = useFiltersPrice(filterMenuPriceType)
  let params = new URLSearchParams(searchParams.toString())

  const onSubmit = (onSubmitFilter: (params: URLSearchParams) => void) => () => {
    params.delete('page')
    onSubmitFilter(params)
    const url = createUrl(pathname, params.toString())
    router.push(url)
  }
  const priceFilterType: PriceFilterType = {...priceFilterTypeWithoutOnSubmit, onSubmit: onSubmit(onSubmitPrice)}
  return {priceFilterType}
}


export const useScroll = () => {
  const searchParams = useSearchParams()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [searchParams])
}