import 'server-only'
import {ProductType} from "@/components/Products/types";

export const searchProducts = (products: ProductType[], searchValue: string): ProductType[] => {
  return  products.filter(product => {
    const searchInName = product.name.toLowerCase()
    const searchInTags = product.tags.toLowerCase()
    const whatSearch = searchValue.trim().toLowerCase()
    return searchInName.includes(whatSearch) || searchInTags.includes(whatSearch)
  })
}