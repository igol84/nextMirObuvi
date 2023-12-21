import {useEffect, useState} from "react";
import {PriceFilterType} from "@/components/Container/FilterMenu/PriceFilter";
import {FilterMenuPriceType} from "@/app/[lang]/[urlTag]/types";
import {createUrl} from "@/lib/format";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

type UseFiltersPrice = {
  (
    filterMenuPriceType: FilterMenuPriceType
  ): {
    priceFilterType: PriceFilterType,
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
  const priceFilterType: PriceFilterType = {
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
  return {priceFilterType, onSubmitPrice}
}


type UseFilters = {
  (
    filterMenuPriceType: FilterMenuPriceType
  ): {
    priceFilterType: PriceFilterType,
    onSubmit: () => void
  }
}

export const UseFilters: UseFilters = (filterMenuPriceType) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const {priceFilterType, onSubmitPrice} = useFiltersPrice(filterMenuPriceType)
  let params = new URLSearchParams(searchParams.toString())

  const onSubmit = () => {
    params.delete('page')
    onSubmitPrice(params)
    const url = createUrl(pathname, params.toString())
    router.push(url)
  }
  return {priceFilterType, onSubmit}
}


export const useScroll = () => {
  const searchParams = useSearchParams()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [searchParams])
}