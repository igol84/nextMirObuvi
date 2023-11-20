import {ProductSchema} from "@/schemas/data";
import {Lang} from "@/dictionaries/get-dictionary";
import {PageType, ProductType} from "@/components/Products/types";

export const createProduct = (product: ProductSchema, lang: Lang, page: PageType = 'catalog'): ProductType => {
  const name = lang === 'en' ? product.name : product.name_ua
  const price_prefix = lang === 'en' ? '₴' : 'грн.'
  switch (product.type) {
    case "product": {
      return {
        id: product.id, name, url: product.url, product_key: product.product_key,
        price: product.price, price_prefix, type: 'product', page
      }
    }
    case "shoes": {
      const sizes: number[] = product.sizes.map(size => size.size)
      return {
        id: product.id, name, url: product.url, product_key: product.product_key,
        price: product.price, price_prefix, type: 'shoes', sizes, page
      }
    }
  }
}