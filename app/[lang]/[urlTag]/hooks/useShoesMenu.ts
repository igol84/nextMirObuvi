import {FilterMenuType} from "@/app/[lang]/[urlTag]/types";
import useSizesType from "@/app/[lang]/[urlTag]/hooks/useSizesType";
import {ShoesMenuType} from "@/components/Container/FilterMenu/ShoesMenu";
import useFiltersGender from "@/app/[lang]/[urlTag]/hooks/useFiltersGander";
import useFiltersColor from "@/app/[lang]/[urlTag]/hooks/useFiltersColor";
import useFiltersSeason from "@/app/[lang]/[urlTag]/hooks/useFiltersSeason";

type UseSizesType = {
  (
    filterMenuType: FilterMenuType
  ): ShoesMenuType
}

const useShoesMenu: UseSizesType = (filterMenuType) => {
  const sizesType = useSizesType(filterMenuType.filterSizesType)
  const genderType = useFiltersGender(filterMenuType.filterGenderType)
  const colorType = useFiltersColor(filterMenuType.filterColorType)
  const seasonType = useFiltersSeason(filterMenuType.filterSeasonType)
  const shoesMenuType: ShoesMenuType = {sizesType, genderType, colorType, seasonType}
  return shoesMenuType
}

export default useShoesMenu