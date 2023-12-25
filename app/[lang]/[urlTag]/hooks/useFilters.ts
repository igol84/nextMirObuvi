import {PriceFilterType} from "@/components/Container/FilterMenu/PriceFilter";
import {FilterMenuPriceType, FilterProductType} from "@/app/[lang]/[urlTag]/types";
import {ProductTypeType} from "@/components/Container/FilterMenu/ProductType";
import useFiltersProductType from "@/app/[lang]/[urlTag]/hooks/useFiltersProductType";
import useFiltersPrice from "@/app/[lang]/[urlTag]/hooks/useFiltersPrice";


type UseFilters = {
  (
    filterMenuPriceType: FilterMenuPriceType,
    filterProductType: FilterProductType
  ): {
    priceFilterType: PriceFilterType,
    productTypeType: ProductTypeType
  }
}

const useFilters: UseFilters = (filterMenuPriceType, filterProductType) => {
  const {priceFilterTypeWithoutOnSubmit, onSubmitPrice} = useFiltersPrice(filterMenuPriceType)
  const {filterProductTypeOnSubmit, onSubmitProductType} = useFiltersProductType(filterProductType)
  const priceFilterType: PriceFilterType = {...priceFilterTypeWithoutOnSubmit, onSubmit: onSubmitPrice}
  const productTypeType: ProductTypeType = {...filterProductTypeOnSubmit, onChangeType: onSubmitProductType}
  return {priceFilterType, productTypeType}
}

export default useFilters
