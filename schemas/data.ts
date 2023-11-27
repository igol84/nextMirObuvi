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
  type: 'product' | 'shoes'
  product_key: string
  name: string
  name_ua: string
  url: string
  qty:  number | null
  brand_id: number
  price: number
  images: string[]
  brand: string | null
  brand_url: string | null
  sizes: SizeSchema[]
  desc: string
  desc_ua: string
  youtube: string | null
  date: string
}

export interface Data {
  brands: BrandSchema[]
  products: ProductSchema[]
}