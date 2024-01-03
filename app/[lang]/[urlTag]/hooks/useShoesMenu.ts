import {FilterMenuType} from "@/app/[lang]/[urlTag]/types";
import useSizesType from "@/app/[lang]/[urlTag]/hooks/useSizesType";
import {ShoesMenuType} from "@/components/Container/FilterMenu/ShoesMenu";
import useGender from "@/app/[lang]/[urlTag]/hooks/useGander";

type UseSizesType = {
  (
    filterMenuType: FilterMenuType
  ): ShoesMenuType
}

const useShoesMenu: UseSizesType = (filterMenuType) => {
  const sizesType = useSizesType(filterMenuType.filterSizesType)
  const genderType = useGender(filterMenuType.filterGenderType)
  const shoesMenuType: ShoesMenuType = {sizesType, genderType}
  return shoesMenuType
}

export default useShoesMenu