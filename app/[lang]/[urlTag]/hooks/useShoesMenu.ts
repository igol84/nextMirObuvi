import {FilterMenuType} from "@/app/[lang]/[urlTag]/types";
import useSizesType from "@/app/[lang]/[urlTag]/hooks/useSizesType";
import {ShoesMenuType} from "@/components/Container/FilterMenu/ShoesMenu";
import useFiltersGender from "@/app/[lang]/[urlTag]/hooks/useFiltersGander";

type UseSizesType = {
  (
    filterMenuType: FilterMenuType
  ): ShoesMenuType
}

const useShoesMenu: UseSizesType = (filterMenuType) => {
  const sizesType = useSizesType(filterMenuType.filterSizesType)
  const genderType = useFiltersGender(filterMenuType.filterGenderType)
  const shoesMenuType: ShoesMenuType = {sizesType, genderType}
  return shoesMenuType
}

export default useShoesMenu