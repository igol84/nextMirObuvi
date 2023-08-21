export type BrandProps = {
  brandId: number
  brandName: string
  url: string
  desc: string
}

export type BrandCardProps = Omit<BrandProps, 'desc'>