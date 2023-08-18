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

export interface Data {
  brands: BrandSchema[]
}