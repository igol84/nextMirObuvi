export interface BrandSchema {
  id: number
  name: string
  title: string
  title_ua: string
  desc: string
  desc_ua: string
  url: string
  active: boolean
}

export interface SizeSchema {
  size: number
  length: number | null
  price: number
  qty: number
}

export interface ProductSchema {
  id: number
  type: string
  name: string
  name_ua: string
  qty:  number | null
  category_id: number
  price: number
  images: string[]
  brand: string | null
  sizes: SizeSchema[]
  desc: string
  desc_ua: string
  youtube: string | null
}

export interface Data {
  brands: BrandSchema[]
  products: ProductSchema[]
}