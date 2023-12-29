import {FilterProductType} from "@/app/[lang]/[urlTag]/types";
import {isShoes, ProductType} from "@/components/Products/types";

type GetFilterProductType = {
  (
    products: ProductType[],
    productType: string | undefined,
  ): FilterProductType
}

const getFilterProductType: GetFilterProductType = (products, productType) => {
  let filterProductType: FilterProductType = productType === 'shoes' ? 'shoes' : null
  const productTypes: Set<string> = new Set()

  products.forEach(product => {
    if (isShoes(product)) {
      productTypes.add('shoes')
    } else {
      productTypes.add('product')
    }
  })

  if (productTypes.size === 1) {
    if (productTypes.has('shoes')) {
      filterProductType = 'shoes'
    }
  }
  return filterProductType
}

export default getFilterProductType