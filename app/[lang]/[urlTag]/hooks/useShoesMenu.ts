import {FilterMenuType} from "@/app/[lang]/[urlTag]/types";
import useSizesType from "@/app/[lang]/[urlTag]/hooks/useSizesType";
import {ShoesMenuType} from "@/components/Container/FilterMenu/ShoesMenu";

type UseSizesType = {
  (
    filterMenuType: FilterMenuType
  ): ShoesMenuType
}

const useShoesMenu: UseSizesType = (filterMenuType) => {
  const sizesType = useSizesType(filterMenuType.filterSizesType)
  const shoesMenuType: ShoesMenuType = {sizesType}
  return shoesMenuType
}

export default useShoesMenu