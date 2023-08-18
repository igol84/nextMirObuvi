interface Size {
  size: number
  length: number | null
  price: number
  qty: number
}

export type ProductProps = {
  id: number
  product_key: string
  // type: string
  url: string
  name: string
  // name_ua: string
  // qty?:  number | null
  // brand_id: number
  // price: number
  // images: string[]
  // brand?: string | null
  // desc: string
  // desc_ua: string
  // youtube?: string | null
  // sizes?: null | Size[]
}

