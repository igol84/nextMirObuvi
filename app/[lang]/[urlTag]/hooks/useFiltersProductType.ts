import {FilterProductType} from "@/app/[lang]/[urlTag]/types";
import {ProductTypeType} from "@/components/Container/FilterMenu/ProductType";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {createUrl} from "@/lib/format";

type UseFiltersProductType = {
  (
    filterProductType: FilterProductType
  ): {
    filterProductTypeOnSubmit: Omit<ProductTypeType, 'onChangeType'>,
    onSubmitProductType: (selected: FilterProductType) => void
  }
}

const useFiltersProductType: UseFiltersProductType = (filterProductType) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  let params = new URLSearchParams(searchParams.toString())
  const filterProductTypeOnSubmit: Omit<ProductTypeType, 'onChangeType'> = {selectedType: filterProductType}
  const onSubmitProductType = (selected: FilterProductType) => {
    params.delete('page')
    params.delete('minPrice')
    params.delete('maxPrice')
    if (selected === 'shoes') {
      params.set('productType', String('shoes'))
    } else {
      params.delete('productType')
    }
    const url = createUrl(pathname, params.toString())
    router.push(url)
  }
  return {filterProductTypeOnSubmit, onSubmitProductType}
}

export default useFiltersProductType