import {PriceFilterType} from "@/components/Container/FilterMenu/PriceFilter";
import {FilterMenuPriceType, FilterMenuType, FilterProductType} from "@/app/[lang]/[urlTag]/types";
import {ProductTypeType} from "@/components/Container/FilterMenu/ProductType";
import useFiltersProductType from "@/app/[lang]/[urlTag]/hooks/useFiltersProductType";
import useFiltersPrice from "@/app/[lang]/[urlTag]/hooks/useFiltersPrice";
import {ShoesMenuType} from "@/components/Container/FilterMenu/ShoesMenu";
import useShoesMenu from "@/app/[lang]/[urlTag]/hooks/useShoesMenu";


type UseFilters = {
  (
    filterMenuPriceType: FilterMenuPriceType,
    filterProductType: FilterProductType,
    filterMenuType: FilterMenuType,
  ): {
    priceFilterType: PriceFilterType,
    productTypeType: ProductTypeType,
    shoesMenuType: ShoesMenuType
  }
}

const useFilters: UseFilters = (filterMenuPriceType, filterProductType, filterMenuType) => {
  const {priceFilterTypeWithoutOnSubmit, onSubmitPrice} = useFiltersPrice(filterMenuPriceType)
  const {filterProductTypeOnSubmit, onSubmitProductType} = useFiltersProductType(filterProductType)
  const {sizesType} = useShoesMenu(filterMenuType)
  const priceFilterType: PriceFilterType = {...priceFilterTypeWithoutOnSubmit, onSubmit: onSubmitPrice}
  const productTypeType: ProductTypeType = {...filterProductTypeOnSubmit, onChangeType: onSubmitProductType}
  const shoesMenuType: ShoesMenuType = {sizesType}
  return {priceFilterType, productTypeType, shoesMenuType}
}

export default useFilters
