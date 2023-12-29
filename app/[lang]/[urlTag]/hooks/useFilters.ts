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
  const priceFilterType = useFiltersPrice(filterMenuPriceType)
  const productTypeType = useFiltersProductType(filterProductType)
  const shoesMenuType = useShoesMenu(filterMenuType)
  return {priceFilterType, productTypeType, shoesMenuType}
}

export default useFilters
