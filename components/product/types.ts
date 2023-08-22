export type productType = 'product' | 'shoes'
export interface ProductBase {
  type: productType
  product_key: string
  name: string
  price: number
  price_prefix: string
  images: string[]
}
export interface SimpleProductProps extends ProductBase{
  type: 'product'
}

export interface ShoesType extends ProductBase{
  type: 'shoes'
  sizes: number[]
}

export type ProductType = SimpleProductProps | ShoesType

export const isShoes = (product: ProductType) => 'sizes' in product

