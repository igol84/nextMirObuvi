import {FilterProductType} from "@/app/[lang]/[urlTag]/types";
import {ProductTypeType} from "@/components/Container/FilterMenu/ProductType";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {createUrl} from "@/lib/format";

type UseFiltersProductType = {
  (
    filterProductType: FilterProductType
  ): ProductTypeType
}

const useFiltersProductType: UseFiltersProductType = (filterProductType) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  let params = new URLSearchParams(searchParams.toString())
  const onChangeType = (selected: FilterProductType) => {
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
  const productTypeType: ProductTypeType = {filterProductType, onChangeType}
  return productTypeType
}

export default useFiltersProductType