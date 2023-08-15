import React from 'react';
import {BrandSchema} from "@/schemas/brands";
import {getBrandsData} from "@/app/[lang]/brands/page";

type Props = {
  params:{
    brandUrl: string
  }
}
export async function generateStaticParams() {
  const brandsData: BrandSchema[] = await getBrandsData()
  return brandsData.map((brand) => ({brandUrl: brand.url}))
}
const BrandPage = ({params:{brandUrl}}: Props) => {
  return (
    <div>
      {brandUrl}
    </div>
  )
}

export default BrandPage;