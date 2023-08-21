export type productType = 'product' | 'shoes'
export interface ProductBase {
  type: productType
  id: number
  product_key: string
  url: string
  name: string
  price: number
  price_prefix: string
}
export interface SimpleProductProps extends ProductBase{
  type: 'product'
}

export interface Size {
  size: number
  length: number | null
  price: number
  qty: number
}
export interface ShoesType extends ProductBase{
  type: 'shoes'
  sizes: Size[]
}

export type ProductType = SimpleProductProps | ShoesType

export const isShoes = (product: ProductType) => 'sizes' in product

