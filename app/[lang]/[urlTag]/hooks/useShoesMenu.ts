import {FilterMenuType} from "@/app/[lang]/[urlTag]/types";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {createUrl} from "@/lib/format";
import {SizesType} from "@/components/Container/FilterMenu/ShoesMenu/Sizes";

type UseShoesMenu = {
  (
    filterMenuType: FilterMenuType
  ): {
    sizesType: SizesType
  }
}

const useShoesMenu: UseShoesMenu = (filterMenuType) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  let params = new URLSearchParams(searchParams.toString())
  const filterSizes = filterMenuType.filterSizesType
  const onSelectSize = (size: number) => {
    const sizeStr = String(size)
    const sizes = params.getAll('size')
    if (sizes.includes(sizeStr)) {
      params.delete('size', sizeStr)
    } else {
      params.append('size', sizeStr)
    }

    const url = createUrl(pathname, params.toString())
    router.push(url)
  }
  return {sizesType: {filterSizes, onSelectSize}}
}

export default useShoesMenu