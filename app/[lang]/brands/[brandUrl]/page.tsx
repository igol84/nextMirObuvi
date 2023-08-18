import React from 'react';
import {BrandSchema} from "@/schemas/brands";
import {getBrandsData} from "@/app/[lang]/brands/page";
import './style.css'
import BrandPage from "@/app/[lang]/brands/[brandUrl]/BrandPage";

type Props = {
  params: {
    brandUrl: string
  }
}

export async function generateStaticParams() {
  const brandsData: BrandSchema[] = await getBrandsData()
  return brandsData.map((brand) => ({brandUrl: brand.url}))
}

async function getBrandData(brandUrl: string) {
  const brandsData: BrandSchema[] = await getBrandsData()
  return brandsData.find(brand => brand.url === brandUrl)
}

const Page = async ({params: {brandUrl}}: Props) => {
  const brandData = await getBrandData(brandUrl)
  if (brandData === undefined) {
    throw new Error(`Fail to fetch brand data with url ${brandUrl}`)
  }
  return (
    <>
      <BrandPage brandData={brandData}/>
    </>

  )
}

export default Page;