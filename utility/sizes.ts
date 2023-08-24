import _, {floor} from "lodash";
import {SizeType} from "@/components/product/types";

export const createEmptySizes = (sizes: number[]): SizeType[] => {
  const minSize = floor(Math.min(...sizes))
  const maxSize = floor(Math.max(...sizes))
  const rangeSizes = _.range(minSize + 1, maxSize).map(size => ({size: size, inStock: false}))

  const inStockSizes: SizeType[] = sizes.map(size => ({size: size, inStock: true}))
  const emptySizes: SizeType[] = []
  rangeSizes.forEach(rangeSize => {
    const inStock = inStockSizes.find(size => size.size === rangeSize.size)
    if (!inStock) {
      emptySizes.push(rangeSize)
    }
  })
  const allSizes = inStockSizes.concat(emptySizes)
  return _.sortBy(allSizes, 'size')
}